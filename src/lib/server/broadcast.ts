import { rooms } from '$lib/server/rooms';

export function broadcast(gameId: number, event: string, data: unknown) {
	const room = rooms.get(gameId);
	if (!room) return;
	const payload = JSON.stringify({ event, data });
	for (const ws of room) ws.send(payload);
}
