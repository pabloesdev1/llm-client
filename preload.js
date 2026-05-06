const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Ahora aceptamos 'baseUrl' como segundo parámetro
  sendMessage: async (message, baseUrl, onChunk) => {
    try {
      const response = await fetch(`${baseUrl}/chat?prompt=${encodeURIComponent(message)}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        onChunk(text);
      }
    } catch (error) {
      console.error("Error en fetch:", error);
      throw error;
    }
  },
});
