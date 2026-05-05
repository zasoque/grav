import type { Handle } from '@sveltejs/kit';
import type { ServerWebSocket } from 'bun';

export const rooms = new Map<number, Set<ServerWebSocket<{ gameId: number }>>>();

export const handle: Handle = async ({ event, resolve }) => {
	if (
		event.request.headers.get('connection')?.toLowerCase().includes('upgrade') &&
		event.request.headers.get('upgrade')?.toLowerCase() === 'websocket' &&
		new URL(event.request.url).pathname.startsWith('/ws')
	) {
		const gameId = Number(new URL(event.request.url).searchParams.get('gameId'));
		const upgraded = event.platform?.server.upgrade(event.platform.request, { data: { gameId } });
		if (upgraded) return new Response(null, { status: 101 });
	}
	return resolve(event);
};

export const websocket = {
	open(ws: ServerWebSocket<{ gameId: number }>) {
		const { gameId } = ws.data;
		if (!rooms.has(gameId)) rooms.set(gameId, new Set());
		rooms.get(gameId)!.add(ws);
	},
	close(ws: ServerWebSocket<{ gameId: number }>) {
		rooms.get(ws.data.gameId)?.delete(ws);
	},
	message(ws: ServerWebSocket<{ gameId: number }>, msg: string) {
		console.log(`Received message from game ${ws.data.gameId}: ${msg}`);
		ws.send(JSON.stringify({ event: 'echo', data: msg }));
	}
};
