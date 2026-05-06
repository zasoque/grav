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
	state: 'waiting' | 'active' | 'closed';
	created_at: string;
	players: { id: number; username: string }[];
	owner: { id: number; username: string } | null;
	grasooshas: {
		id: number;
		user_id: number;
		x: number;
		y: number;
		created_at: string;
	}[];
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
    INSERT INTO games (owner_id, size, sequence_max, area_size, area_max, distance_min, distance_max, max_players, turn_timeout, total_timeout)
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
	await db`INSERT INTO players (game_id, user_id, timeout_left) VALUES (${game.id}, ${ownerId}, ${totalTimeout})`;
	return game;
}

export async function cleanWaitingGames(userId: number): Promise<void> {
	await db`
    UPDATE games
    SET state = 'closed'
    WHERE state = 'waiting' AND owner_id = ${userId}
  `;
}

const GAME_OBJECT = db`
  g.*,
  (
    SELECT JSON_ARRAYAGG(JSON_OBJECT('id', p.user_id, 'username', u.username))
    FROM players p
    JOIN users u ON p.user_id = u.id
    WHERE p.game_id = g.id
  ) AS players,
  (
    SELECT JSON_OBJECT('id', u.id, 'username', u.username)
    FROM users u
    WHERE u.id = g.owner_id
  ) AS owner,
  (
    SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'id', s.id,
      'user_id', s.user_id,
      'x', s.x,
      'y', s.y,
      'color', u.color,
      'created_at', s.created_at,
      'username', u.username
    ))
    FROM game_grasooshas s
    JOIN users u ON s.user_id = u.id
    WHERE s.game_id = g.id
  ) AS grasooshas
`;

async function parseGame(game: any): Promise<Game> {
	return {
		...game,
		players: JSON.parse(game.players) || [],
		owner: JSON.parse(game.owner) || null,
		grasooshas: JSON.parse(game.grasooshas) || []
	};
}

export async function getGameById(gameId: number): Promise<Game | null> {
	const [game] = await db`SELECT ${GAME_OBJECT} FROM games g WHERE g.id = ${gameId}`;
	if (!game) return null;
	return parseGame(game);
}

export async function getWaitingGames(): Promise<Game[]> {
	const games =
		await db`SELECT ${GAME_OBJECT} FROM games g WHERE g.state = 'waiting' ORDER BY created_at DESC`;
	if (!games) return [];
	return Promise.all(games.map(parseGame));
}
