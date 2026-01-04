import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

interface SuggestRequest {
  message: string;
  context: {
    identity: {
      name: string;
      description: string;
    };
    currentFeatures: string[];
    currentStep: number;
  };
}

const SYSTEM_PROMPT = `Tu es un assistant specialise dans la configuration de projets SaaS.
Tu aides les utilisateurs a choisir les bonnes fonctionnalites pour leur projet.

Catalogue des fonctionnalites disponibles:
- CORE: auth-social, auth-magic-link, user-profile, multi-tenant
- E-COMMERCE: product-catalog, shopping-cart, checkout, order-management, inventory, product-reviews, wishlist, coupons, shipping
- CONTENT: blog, landing-pages, faq, documentation, changelog
- COMMUNICATION: newsletter, notifications-email, notifications-push, chat-support, contact-form
- ANALYTICS: analytics-basic, analytics-plausible, user-tracking
- ADMIN: admin-dashboard, user-management, content-moderation
- INTEGRATION: api-public, webhooks, file-upload, ai-assistant

Reponds toujours en francais de maniere concise et utile.
Quand tu suggeres des fonctionnalites, mentionne leurs IDs exacts pour que le systeme puisse les reconnaitre.`;

export async function POST(request: Request) {
  try {
    const { message, context }: SuggestRequest = await request.json();

    if (!OPENROUTER_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        response: `Je comprends que vous travaillez sur "${context.identity.name || "votre projet"}".

Basé sur votre description, voici quelques recommandations générales :

**Pour un SaaS classique :**
- auth-social (authentification)
- user-profile (profil utilisateur)
- admin-dashboard (administration)
- analytics-basic (suivi)

**Pour du e-commerce :**
- product-catalog, shopping-cart, checkout
- order-management, product-reviews

**Pour du contenu :**
- blog, landing-pages, newsletter

N'hésitez pas à sélectionner les fonctionnalités qui correspondent à votre vision !`,
        suggestedFeatures: ["auth-social", "user-profile", "admin-dashboard", "analytics-basic"],
      });
    }

    const userPrompt = `Description du projet: ${context.identity.description || "Non fournie"}
Nom du projet: ${context.identity.name || "Non defini"}
Fonctionnalites deja selectionnees: ${context.currentFeatures.join(", ") || "Aucune"}
Etape actuelle: ${context.currentStep}

Question de l'utilisateur: ${message}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur API OpenRouter");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "Desole, je n'ai pas pu generer une reponse.";

    // Extract suggested feature IDs from the response
    const featureIds = [
      "auth-social", "auth-magic-link", "user-profile", "multi-tenant",
      "product-catalog", "shopping-cart", "checkout", "order-management",
      "inventory", "product-reviews", "wishlist", "coupons", "shipping",
      "blog", "landing-pages", "faq", "documentation", "changelog",
      "newsletter", "notifications-email", "notifications-push", "chat-support", "contact-form",
      "analytics-basic", "analytics-plausible", "user-tracking",
      "admin-dashboard", "user-management", "content-moderation",
      "api-public", "webhooks", "file-upload", "ai-assistant",
    ];

    const suggestedFeatures = featureIds.filter((id) => aiResponse.toLowerCase().includes(id));

    return NextResponse.json({
      response: aiResponse,
      suggestedFeatures: suggestedFeatures.length > 0 ? suggestedFeatures : undefined,
    });
  } catch (error) {
    console.error("Erreur AI suggest:", error);
    return NextResponse.json(
      { error: "Erreur lors de la generation de suggestions" },
      { status: 500 }
    );
  }
}
