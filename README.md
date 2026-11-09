# League of Legends MCP Server

**League of Legends data and coaching analysis for Claude Desktop, ChatGPT and other MCP-compatible AI assistants.**

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-00C7B7?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-5A67D8?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-26-blue?style=flat-square)](#available-tools)

## What does it do?

This server connects an AI assistant to League of Legends data. It exposes **26 tools** for player profiles, ranked stats, match history and timelines, champion mastery, live game lookup, league standings, Clash, challenges and server status. Four of them run an analysis on recent matches and return a coaching report: performance, champion, improvement tips and a two-player comparison.

No Riot API key is needed on your side. You connect with an Apify API token.

This repository holds the tool declarations only. The server itself runs on Apify in Standby mode, and the connection URL below points to it.

## Available Tools

### Account & Profile
| Tool | Description |
|------|-------------|
| `lol_get_account` | Account by Riot ID, with the PUUID used by other calls |
| `lol_get_summoner` | Summoner info (level, profile icon) by PUUID |
| `lol_get_ranked` | Ranked info (tier, rank, LP, win/loss) by PUUID |
| `lol_get_player_profile` | Complete profile (account, summoner and ranked) in one call |

### Match Data
| Tool | Description |
|------|-------------|
| `lol_get_match_history` | Recent match IDs for a player |
| `lol_get_match_details` | Detailed match data with resolved champion, item and rune names |
| `lol_get_match_timeline` | Minute-by-minute timeline: gold differences, kills, objectives |

### Champion Mastery
| Tool | Description |
|------|-------------|
| `lol_get_champion_mastery` | Top champion masteries with points, levels and champion roles |
| `lol_get_mastery_by_champion` | Detailed mastery for one champion: level, points, progression, season milestones |

### Live Game
| Tool | Description |
|------|-------------|
| `lol_get_live_game` | Check if a player is in game, with participants, champions, runes and spells |

### Leagues & Ranked Ladders
| Tool | Description |
|------|-------------|
| `lol_get_league_top` | Challenger, Grandmaster or Master league: the 50 highest players by LP |
| `lol_get_league_entries` | League entries by queue, tier and division (paginated) |
| `lol_get_league_by_id` | League by its UUID: up to 100 players sorted by LP |
| `lol_get_league_entries_exp` | Paginated entries that also cover apex tiers (Master and above) |

### Clash
| Tool | Description |
|------|-------------|
| `lol_get_clash_player` | Clash registration info for a player (teams, positions) |
| `lol_get_clash_team` | Clash team: name, tier, captain and players |
| `lol_get_clash_tournaments` | Active Clash tournaments, by ID or by team |

### Challenges
| Tool | Description |
|------|-------------|
| `lol_get_challenges` | Challenge configurations, percentiles or leaderboards |
| `lol_get_player_challenges` | A player's challenge progression: points, categories, progress |

### Utility
| Tool | Description |
|------|-------------|
| `lol_get_champion_rotation` | Current free champion rotation |
| `lol_get_featured_games` | Returns a notice only, because featured games are no longer available. Use `lol_get_live_game` for one player's current game |
| `lol_get_server_status` | Server status for a region: incidents and maintenance |

### AI Analysis
| Tool | Description |
|------|-------------|
| `lol_analyze_performance` | Recent performance: stats, strengths, weaknesses, rank-based tips |
| `lol_analyze_champion` | Performance on a specific champion with stats and tips |
| `lol_get_improvement_tips` | Personalized tips with current vs target values |
| `lol_compare_players` | Compare two players side by side: KDA, CS, vision, damage |

## Regions

14 League of Legends regions, from `euw1` (Europe West) and `na1` to `kr`. Analysis tools answer in English or French.

## Quick Start

1. Create an Apify account if you do not have one: [sign up](https://console.apify.com/sign-up?fpr=mrbridge).
2. Get your [Apify API token](https://console.apify.com/settings/integrations?fpr=mrbridge).
3. Add a custom MCP connector in your client with this URL, using Streamable HTTP:

```
https://mrbridge--lol-mcp-server.apify.actor/mcp?token=YOUR_APIFY_TOKEN
```

4. Ask your assistant: *"Analyze my last 20 ranked games, my Riot ID is YourName#EUW"*

## Pricing

Pay-per-event on Apify. See the [Pricing tab](https://apify.com/mrbridge/lol-mcp-server/pricing?fpr=mrbridge) of the Store page for the current rates.

## Links

- **Apify Store**: [LoL MCP Server](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)
- **Full documentation**: the Apify Store page has the complete README, output examples and troubleshooting
- **Teamfight Tactics**: [TFT MCP Server](https://apify.com/mrbridge/tft-mcp-server?fpr=mrbridge)

## Built by MrBridge

See the [LoL MCP server overview](https://mr-bridge.com/solutions/lol-mcp-server) or the [MCP server catalog](https://mr-bridge.com/mcp-servers). More about what we do at [mr-bridge.com](https://mr-bridge.com).

## License

MIT

LoL MCP Server is not endorsed by and is not affiliated with Riot Games. League of Legends is a trademark of Riot Games, Inc.
