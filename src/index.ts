import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// League of Legends MCP Server — Tool declarations
// Full implementation runs on Apify Standby: https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge

const server = new McpServer({
  name: "lol-mcp-server",
  version: "2.0.0",
});

// Account & Profile
server.tool("lol_get_account", "Get account info by Riot ID", {
  gameName: z.string().describe("Player name (e.g. Faker)"),
  tagLine: z.string().describe("Tag line (e.g. KR1)"),
  region: z.string().optional().describe("Region (euw1, na1, kr, br1, etc.)"),
});

server.tool("lol_get_summoner", "Get summoner info (level, profile icon)", {
  puuid: z.string().describe("Player PUUID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_ranked", "Get ranked stats (tier, rank, LP, wins/losses)", {
  summonerId: z.string().describe("Summoner ID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_player_profile", "Get complete player profile in one call", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
});

// Match History
server.tool("lol_get_match_history", "Get recent match IDs", {
  puuid: z.string().describe("Player PUUID"),
  count: z.number().optional().describe("Number of matches"),
});

server.tool("lol_get_match_details", "Get detailed info about a specific match", {
  matchId: z.string().describe("Match ID"),
});

server.tool("lol_get_match_timeline", "Get minute-by-minute match timeline", {
  matchId: z.string().describe("Match ID"),
});

// Champion & Live
server.tool("lol_get_champion_mastery", "Get champion mastery data for a player", {
  puuid: z.string().describe("Player PUUID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_live_game", "Check if a player is currently in game", {
  puuid: z.string().describe("Player PUUID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_champion_rotation", "Get current free champion rotation", {
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_featured_games", "Get featured games", {
  region: z.string().optional().describe("Region"),
});

// AI Analysis
server.tool("lol_analyze_performance", "Analyze recent performance with AI recommendations", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
  matchCount: z.number().optional().describe("Number of matches to analyze"),
});

server.tool("lol_analyze_champion", "Analyze performance on a specific champion", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  championName: z.string().describe("Champion name"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_improvement_tips", "Get personalized improvement tips", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_compare_players", "Compare stats between two players", {
  gameName1: z.string().describe("First player name"),
  tagLine1: z.string().describe("First player tag"),
  gameName2: z.string().describe("Second player name"),
  tagLine2: z.string().describe("Second player tag"),
  region: z.string().optional().describe("Region"),
});

// League & Clash
server.tool("lol_get_league_by_id", "Get league info by ID", {
  leagueId: z.string().describe("League ID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_league_entries", "Get league entries by tier and rank", {
  tier: z.string().describe("Tier (IRON, BRONZE, SILVER, GOLD, PLATINUM, EMERALD, DIAMOND)"),
  division: z.string().describe("Division (I, II, III, IV)"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_league_entries_exp", "Get league entries (experimental)", {
  tier: z.string().describe("Tier"),
  division: z.string().describe("Division"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_league_top", "Get top league entries (Challenger, Grandmaster, Master)", {
  queue: z.string().describe("Queue type"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_clash_tournaments", "Get Clash tournament info", {
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_clash_player", "Get Clash player info", {
  summonerId: z.string().describe("Summoner ID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_clash_team", "Get Clash team info", {
  teamId: z.string().describe("Team ID"),
  region: z.string().optional().describe("Region"),
});

// Challenges & Status
server.tool("lol_get_challenges", "Get challenge system configuration data", {
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_player_challenges", "Get player challenge progress", {
  puuid: z.string().describe("Player PUUID"),
  region: z.string().optional().describe("Region"),
});

server.tool("lol_get_server_status", "Get LoL server status", {
  region: z.string().optional().describe("Region"),
});
