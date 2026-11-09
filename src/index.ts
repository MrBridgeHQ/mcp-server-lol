import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// League of Legends MCP Server - Tool declarations
// Full implementation runs on Apify Standby: https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge

const server = new McpServer({
  name: "lol-mcp-server",
  version: "2.2.3",
});

// Shared input shapes
const region = z
  .enum(["euw1", "eun1", "na1", "kr", "br1", "la1", "la2", "oc1", "tr1", "ru", "jp1", "ph2", "sg2", "th2", "tw2", "vn2"])
  .optional()
  .default("euw1")
  .describe("Server region");
const language = z.enum(["en", "fr"]).optional().default("en").describe("Language for messages");
const puuid = z.string().describe("Player PUUID (78-character unique identifier)");
const gameName = z.string().describe("Riot ID game name (before the #)");
const tagLine = z.string().describe("Riot ID tag line (after the #)");
const matchId = z.string().describe("Match ID (e.g., EUW1_1234567890)");
const championName = z.string().describe('Champion name (e.g., "Thresh", "Lee Sin")');
const queueType = z.enum(["ranked", "normal", "all"]).optional().describe("Queue type filter");
const rankedQueue = z.enum(["RANKED_SOLO_5x5", "RANKED_FLEX_SR"]).describe("Ranked queue type");
const tier = z
  .enum(["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"])
  .describe("Ranked tier");
const division = z.enum(["I", "II", "III", "IV"]).describe("Ranked division");
const page = z.number().min(1).optional().default(1).describe("Page number (default: 1)");

// Account & Profile
server.tool(
  "lol_get_account",
  "Get a League of Legends account by Riot ID (gameName#tagLine). Returns the PUUID needed for other API calls.",
  { gameName, tagLine, region },
);

server.tool("lol_get_summoner", "Get summoner information (level, profile icon) by PUUID.", { puuid, region });

server.tool("lol_get_ranked", "Get ranked information (tier, rank, LP, win/loss) for a player by PUUID.", { puuid, region });

server.tool(
  "lol_get_player_profile",
  "Get a complete player profile including account, summoner info, and ranked stats by Riot ID. This is the recommended starting point for player analysis.",
  { gameName, tagLine, region },
);

// Match History
server.tool(
  "lol_get_match_history",
  "Get recent match IDs for a player. Use lol_get_match_details to get details of each match.",
  {
    puuid,
    count: z.number().min(1).max(100).optional().default(20).describe("Number of matches to retrieve (1-100, default: 20)"),
    queueType,
    region,
  },
);

server.tool(
  "lol_get_match_details",
  "Get detailed information about a specific match by match ID. Includes resolved champion names, items, and runes.",
  { matchId, region },
);

server.tool(
  "lol_get_match_timeline",
  "Get detailed timeline data for a match. Includes gold differences, kills, objectives at each minute.",
  { matchId, region },
);

// Champion & Live
server.tool(
  "lol_get_champion_mastery",
  "Get champion mastery information for a player. Returns top champions with mastery points, levels, and additional details like champion roles.",
  {
    puuid,
    top: z.number().min(1).max(150).optional().default(10).describe("Number of top champions to retrieve (1-150, default: 10)"),
    region,
  },
);

server.tool(
  "lol_get_mastery_by_champion",
  "Get detailed mastery information for a specific champion. Returns mastery level, points, progression to next level, season milestones, and marks required.",
  { puuid, championName, region },
);

server.tool(
  "lol_get_live_game",
  "Check if a player is currently in a game and get live game details including all participants, champions, runes, and summoner spells.",
  { puuid, region },
);

server.tool(
  "lol_get_champion_rotation",
  "Get the current free champion rotation. Returns free-to-play champions for regular and new players.",
  { region },
);

server.tool(
  "lol_get_featured_games",
  "Featured games are no longer available from the game publisher, so this tool only returns a notice. lol_get_live_game still works for a given player.",
  { region },
);

// AI Analysis
server.tool(
  "lol_analyze_performance",
  "Analyze a player's recent performance and provide improvement recommendations. Returns statistics, strengths, weaknesses, and actionable tips based on their rank.",
  {
    puuid,
    matchCount: z.number().min(5).max(20).optional().default(20).describe("Number of recent matches to analyze (5-20, default: 20)"),
    queueType,
    region,
    language,
  },
);

server.tool(
  "lol_analyze_champion",
  "Analyze a player's performance on a specific champion with detailed statistics, recent matches, and improvement tips.",
  {
    puuid,
    championName,
    matchCount: z.number().min(3).max(20).optional().default(20).describe("Number of matches to search for this champion (3-20, default: 20)"),
    region,
    language,
  },
);

server.tool(
  "lol_get_improvement_tips",
  "Get personalized improvement tips based on recent match analysis. Provides specific, actionable advice with current vs target values.",
  {
    puuid,
    matchCount: z.number().min(5).max(20).optional().default(20).describe("Number of recent matches to analyze (5-20, default: 20)"),
    queueType,
    region,
    language,
  },
);

server.tool(
  "lol_compare_players",
  "Compare two players' statistics side by side. Shows differences in KDA, CS, vision, damage, and identifies who excels in what areas.",
  {
    player1: z.object({ gameName, tagLine }).describe("First player Riot ID"),
    player2: z.object({ gameName, tagLine }).describe("Second player Riot ID"),
    matchCount: z.number().min(5).max(30).optional().default(20).describe("Number of matches to analyze per player (5-30, default: 20)"),
    queueType,
    region,
    language,
  },
);

// League & Clash
server.tool(
  "lol_get_league_by_id",
  "Get a league by its UUID. Returns up to 100 players sorted by LP, each with puuid, and the Riot ID of the 50 highest.",
  { leagueId: z.string().describe("League UUID"), region },
);

server.tool(
  "lol_get_league_entries",
  "Get all league entries for a given queue, tier, and division (paginated). Useful for browsing ranked ladders.",
  { queue: rankedQueue, tier, division, page, region },
);

server.tool(
  "lol_get_league_entries_exp",
  "Get league entries from the experimental variant (includes apex tiers in paginated form). Same as league entries but also works for Master+.",
  { queue: rankedQueue, tier, division, page, region },
);

server.tool(
  "lol_get_league_top",
  "Get the top league (Challenger, Grandmaster, or Master) for a ranked queue. Returns the 50 highest players by LP, each with puuid and Riot ID.",
  {
    queue: rankedQueue,
    tier: z.enum(["CHALLENGER", "GRANDMASTER", "MASTER"]).describe("Apex tier (Challenger, Grandmaster, Master)"),
    region,
  },
);

server.tool(
  "lol_get_clash_tournaments",
  "Get Clash tournament information. Can return all active tournaments, a specific tournament by ID, or a tournament associated with a team.",
  {
    tournamentId: z.number().optional().describe("Specific tournament ID (omit for all)"),
    teamId: z.string().optional().describe("Get tournament by team ID"),
    region,
  },
);

server.tool(
  "lol_get_clash_player",
  "Get Clash registration info for a player by summoner ID. Returns team associations and positions.",
  { summonerId: z.string().describe("Summoner ID"), region },
);

server.tool(
  "lol_get_clash_team",
  "Get a Clash team by its ID. Returns team name, tier, captain, and all players with their positions.",
  { teamId: z.string().describe("Clash team ID"), region },
);

// Challenges & Status
server.tool(
  "lol_get_challenges",
  "Get challenge configurations, percentiles, or leaderboards. Without challengeId: returns all challenge configs. With challengeId: returns specific config. With includePercentiles: adds percentile data. With leaderboardLevel: returns leaderboard for that level.",
  {
    challengeId: z.number().optional().describe("Specific challenge ID (omit for all configs)"),
    includePercentiles: z.boolean().optional().default(false).describe("Include percentile data"),
    leaderboardLevel: z
      .enum(["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"])
      .optional()
      .describe("Get leaderboard for this level (requires challengeId)"),
    region,
  },
);

server.tool(
  "lol_get_player_challenges",
  "Get a player's challenge progression data by PUUID. Returns total points, category points, individual challenge progress, and display preferences.",
  { puuid, region },
);

server.tool(
  "lol_get_server_status",
  "Get the current server status for a region. Returns active incidents and scheduled maintenances.",
  { region },
);
