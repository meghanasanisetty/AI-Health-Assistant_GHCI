import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * CORS headers used for all responses so browser clients can call this function.
 * - Allows any origin (adjust in production)
 * - Allows common headers used by client apps (authorization, apikey, content-type)
 */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Main HTTP handler using Deno's std serve.
 * It handles:
 * - OPTIONS preflight requests for CORS
 * - JSON POST requests containing user message and context
 * - Calls external AI gateway and returns its assistant response
 */
serve(async (req) => {
  // Handle CORS preflight quickly
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse incoming request body
    const { message, language, conversationHistory, nearbyHospitals, userLocation } = await req.json();

    // Read API key from environment - required to call the AI gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      // Fail early if the function is misconfigured
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing health query in language:", language);
    console.log("Nearby hospitals:", nearbyHospitals);

    // Build hospital context string to inject into the system prompt.
    // This helps the model recommend the nearest hospitals at the end of responses.
    let hospitalContext = "";
    if (nearbyHospitals && nearbyHospitals.length > 0) {
      hospitalContext = `\n\nNearby hospitals available to the user:\n${nearbyHospitals.map((h: any, i: number) => 
        `${i + 1}. ${h.name} (${h.distance} away) - Services: ${h.services.join(', ')}`
      ).join('\n')}`;
    }

    // Compose the messages array for the chat completion API.
    // - system: instructions and constraints for the assistant
    // - conversationHistory: previous messages (if any)
    // - user: current user message
    const messages = [
      {
        role: "system",
        content: `You are an AI health assistant for underserved communities. 
        
CRITICAL INSTRUCTIONS:
- User is speaking in language code: ${language}
- Respond ONLY in ${language}, never in English
- Extract health symptoms and conditions from user input
- Provide clear, actionable advice in simple language
- Include:
  1. Possible causes
  2. First aid steps
  3. When to seek immediate care
  4. ALWAYS suggest the 2 nearest hospitals from the list below at the end of your response
- Use bullet points and clear formatting
- Be compassionate and reassuring
- Prioritize safety - always recommend professional care when serious
${hospitalContext}

Base your responses on reliable health information from WHO, government health departments, and medical guidelines.`
      },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    // Call the external AI gateway with the composed messages
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
        temperature: 0.7,
      }),
    });

    // Handle known gateway error statuses gracefully and surface useful messages to clients
    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    // Parse successful response and extract assistant message content
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Return the assistant's response to the caller with CORS headers
    return new Response(
      JSON.stringify({ response: assistantMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Centralized error handling - log and return 500 with error message (safe for debugging)
    console.error("Error in health-assistant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
