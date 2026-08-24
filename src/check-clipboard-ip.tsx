import { Action, ActionPanel, Clipboard, Detail, Icon, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { IpReport } from "./ip-report";
import { extractIp } from "./lib/ip";

export default function Command() {
  const { isLoading, data: ip } = usePromise(async () => extractIp((await Clipboard.readText()) ?? ""));

  if (isLoading) {
    return <Detail isLoading markdown="Reading the clipboard…" />;
  }

  if (!ip) {
    return (
      <List>
        <List.EmptyView
          icon={Icon.Clipboard}
          title="No IP address in the clipboard"
          description="Copy an IPv4 or IPv6 address, then run this command again."
          actions={
            <ActionPanel>
              <Action.Open
                title="Open Check IP Command"
                icon={Icon.Shield}
                target="raycast://extensions/belli/abuseipdb/check-ip"
              />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  return <IpReport ip={ip} />;
}
