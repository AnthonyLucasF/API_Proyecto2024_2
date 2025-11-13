/* import { Server } from "socket.io";

export function setupWebSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado vía WebSocket");

    // Aquí defines los eventos que escuchas y reenvías
    socket.on("nuevo_lote", (data) => {
      socket.broadcast.emit("nuevo_lote", data);
    });

    socket.on("lote_actualizado", (data) => {
      socket.broadcast.emit("lote_actualizado", data);
    });

    // ...
  });

  return io;
}
 */

//Base de Datos subida a la nube Clever Cloud
console.log("Base de Datos en la nube Clever Cloud :)");

export const setupWebSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Cliente WebSocket conectado");

        // Puedes escuchar eventos personalizados si deseas:
        socket.on("nuevo_lote", (data) => {
            console.log("📦 Nuevo lote recibido via WebSocket:", data);
            // Reenviar a todos los clientes (broadcast)
            socket.broadcast.emit("nuevo_lote", data);
        });

        socket.on("lote_actualizado", (data) => {
            console.log("✏️ Lote actualizado recibido via WebSocket:", data);
            socket.broadcast.emit("lote_actualizado", data);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Cliente WebSocket desconectado");
        });
    });
};
