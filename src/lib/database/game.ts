import { db } from '.';

export type Game = {
	id: number;
	owner_id: number;
	size: number;
	sequence_max: number;
	area_size: number;
	area_max: number;
	distance_min: number;
	distance_max: number;
	max_players: number;
	turn_timeout: number;
	total_timeout: number;
};

export async function createGame(
	ownerId: number,
	size: number,
	sequenceMax: number,
	areaSize: number,
	areaMax: number,
	distanceMin: number,
	distanceMax: number,
	maxPlayers: number,
	turnTimeout: number,
	totalTimeout: number
): Promise<Game[]> {
	const [game] = await db`
    INSERT INTO games (owner, size, sequence_max, area_size, area_max, distance_min, distance_max, max_players, turn_timeout, total_timeout)
    VALUES (
      ${ownerId},
      ${size},
      ${sequenceMax},
      ${areaSize},
      ${areaMax},
      ${distanceMin},
      ${distanceMax},
      ${maxPlayers},
      ${turnTimeout},
      ${totalTimeout}
    )
    RETURNING *
  `;
	return game;
}

export async function cleanWaitingGames(userId: number): Promise<void> {
	await db`
    UPDATE games
    SET state = 'closed'
    WHERE state = 'waiting' AND owner = ${userId}
  `;
}

export async function getGameById(gameId: number): Promise<Game | null> {
	const [game] = await db`
    SELECT *
    FROM games
    WHERE id = ${gameId}
  `;
	return game || null;
}
