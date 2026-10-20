# 原生同事

这是 `zlzfun/clowder-bot` 最小验证使用的同事插件。松果负责实施，青禾负责研究。安装并启用后，Console 左侧显示「同事」；首次打开某位同事时，选择已有的本地 Codex 成员作为执行模板和一个工作目录。之后直接使用原生聊天发消息、查看执行过程及文件产物。

独立桌面客户端也复用同一份插件，无需网页或专用 Agent 进程。在 Clowder Bot 的「连接与插件」中连接本机 Codex、安装并启用本包，然后为同事选择工作目录。日常直接进入聊天；回复显示为气泡，工具执行细节默认折叠。名字、角色指令仍由本包提供，桌面壳不硬编码两位同事。

插件通过受监督的 MCP 工具 `clowder_native_conversations_v1` 提供版本化数据，包含名称、说明和角色指令。它不提供网页，不保存聊天记录，不启动 Codex，也不取得自行发送消息的权限。宿主保存受理后的身份与会话绑定，复用原生 Agent、会话、消息及恢复能力。

当前仅适配包含 native-conversation 通用接口的 Clowder Bot 验证分支。上游 Clowder AI 可以安装工具，但尚不会显示原生目录。首次绑定后模板和目录固定；升级插件的 package revision 需要后续显式迁移接口，本验证不会自动扩大原授权。停用插件后历史聊天仍可读，新执行被拒绝。

开发：`pnpm --filter @zlzfun/clowder-native-colleagues build && pnpm --filter @zlzfun/clowder-native-colleagues test`。打包：在本目录执行 `npm pack --pack-destination /tmp`，然后使用 Console 设置中的本地插件包安装入口。发布包内含自包含的 MCP 产物，不需要宿主在启用时下载运行依赖。

验证记录（2026-10-18）：已在隔离 Console 中用两位同事完成真实文件生成与独立核验；正常重启 API 后，身份、历史、工作目录和各自的 Codex 会话均恢复，并成功继续对话。实际界面仍沿用宿主的 CLI Output 折叠卡片；强制杀掉整个进程组与执行中恢复不在这次验收结论内。见 [宿主验收与实际产物](https://github.com/zlzfun/clowder-bot/blob/feat/native-colleague/docs/plans/clowder-bot-native-colleague-validation.md)。

桌面验证（2026-10-20）：两位同事通过 Electron 原生输入框完成 CSV 汇总脚本及独立核验报告。使用应用菜单完全退出后，Electron、API、Web、Redis 和插件进程均退出；重开后绑定、消息、文件和两条 Codex 会话完全恢复，两人各自回忆出只出现在对话中的记忆词并继续回复。验收限于正常空闲退出，未声称强制崩溃或执行中恢复。见 [独立客户端验收与截图](https://github.com/zlzfun/clowder-bot/blob/feat/bot-desktop/docs/plans/clowder-bot-desktop.md)。
