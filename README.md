# League of Legends MCP Server

**LoL data & AI-powered coaching for Claude Desktop, Claude Code & MCP-compatible AI assistants.**

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-00C7B7?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-5A67D8?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-25-blue?style=flat-square)](#available-tools)
[![Rating](https://img.shields.io/badge/Rating-5.0%2F5-gold?style=flat-square)](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)

## What does it do?

League of Legends MCP Server connects AI assistants to LoL data via the Riot Games API. **25 tools** for player profiles, ranked stats, match history, champion mastery, live game detection, league standings, Clash tournaments, challenges - plus **AI-powered performance analysis and coaching**.

**No Riot API key needed** - the server includes a built-in key.

## Available Tools

### Account & Profile
| Tool | Description |
|------|-------------|
| `lol_get_account` | Get account info by Riot ID |
| `lol_get_summoner` | Get summoner info (level, profile icon) |
| `lol_get_ranked` | Get ranked stats (tier, rank, LP, wins/losses) |
| `lol_get_player_profile` | Get complete player profile in one call |

### Match History
| Tool | Description |
|------|-------------|
| `lol_get_match_history` | Get recent match IDs |
| `lol_get_match_details` | Get detailed info about specific matches |
| `lol_get_match_timeline` | Get minute-by-minute match timeline |

### Champion & Live
| Tool | Description |
|------|-------------|
| `lol_get_champion_mastery` | Get champion mastery data |
| `lol_get_live_game` | Check if a player is currently in game |
| `lol_get_champion_rotation` | Get current free champion rotation |
| `lol_get_featured_games` | Get featured games |

### AI Analysis
| Tool | Description |
|------|-------------|
| `lol_analyze_performance` | Analyze recent performance with recommendations |
| `lol_analyze_champion` | Analyze performance on a specific champion |
| `lol_get_improvement_tips` | Get personalized improvement tips |
| `lol_compare_players` | Compare stats between two players |

### League & Clash
| Tool | Description |
|------|-------------|
| `lol_get_league_by_id` | Get league info by ID |
| `lol_get_league_entries` | Get league entries by tier/rank |
| `lol_get_league_entries_exp` | Get league entries (experimental) |
| `lol_get_league_top` | Get top league entries |
| `lol_get_clash_tournaments` | Get Clash tournament info |
| `lol_get_clash_player` | Get Clash player info |
| `lol_get_clash_team` | Get Clash team info |

### Challenges & Status
| Tool | Description |
|------|-------------|
| `lol_get_challenges` | Get challenge system data |
| `lol_get_player_challenges` | Get player challenge info |
| `lol_get_server_status` | Get LoL server status |

## Key Features

- **AI Coaching**: Claude analyzes your matches and generates detailed coaching reports
- **Data Dragon Integration**: Champion, item, rune, and spell names automatically resolved
- **Intelligent Caching**: Smart TTL-based caching to reduce API calls
- **16 Regions**: EUW, NA, KR, BR, LA, OC, TR, RU, JP, PH, SG, TH, TW, VN, and more

## Quick Start

1. Get your [Apify API Token](https://console.apify.com/settings/integrations)
2. Add a custom MCP connector:

```
https://mrbridge--lol-mcp-server.apify.actor/mcp?token=YOUR_APIFY_TOKEN
```

3. Ask Claude: *"Analyze my ranked games, my Riot ID is YourName#EUW"*

## Pricing

Pay-per-event on Apify. $5 free credits/month included.

## Links

- **Apify Store**: [LoL MCP Server](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)
- **Full documentation**: See the Apify Store page for detailed README, output examples, and troubleshooting

## License

MIT
