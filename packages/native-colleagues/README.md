# 原生同事

这是 `zlzfun/clowder-bot` 最小验证使用的同事插件。松果负责实施，青禾负责研究。安装并启用后，Console 左侧显示「同事」；首次打开某位同事时，选择已有的本地 Codex 成员作为执行模板和一个工作目录。之后直接使用原生聊天发消息、查看执行过程及文件产物。

插件通过受监督的 MCP 工具 `clowder_native_conversations_v1` 提供版本化数据，包含名称、说明和角色指令。它不提供网页，不保存聊天记录，不启动 Codex，也不取得自行发送消息的权限。宿主保存受理后的身份与会话绑定，复用原生 Agent、会话、消息及恢复能力。

当前仅适配包含 native-conversation 通用接口的 Clowder Bot 验证分支。上游 Clowder AI 可以安装工具，但尚不会显示原生目录。首次绑定后模板和目录固定；升级插件的 package revision 需要后续显式迁移接口，本验证不会自动扩大原授权。停用插件后历史聊天仍可读，新执行被拒绝。

开发：`pnpm --filter @zlzfun/clowder-native-colleagues build && pnpm --filter @zlzfun/clowder-native-colleagues test`。打包：在本目录执行 `npm pack --pack-destination /tmp`，然后使用 Console 设置中的本地插件包安装入口。发布包内含自包含的 MCP 产物，不需要宿主在启用时下载运行依赖。
