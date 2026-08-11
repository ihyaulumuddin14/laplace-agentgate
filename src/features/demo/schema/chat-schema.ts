import type { DecisionType } from "../types";

export interface ActionRequestSchema {
  schema_version: string;
  run_id: string;
  action_id: string;
  source: string;
  domain: string;
  action_type: string;
  target_system: string;
  target: string;
  content_context?: string;
  payload_summary: string;
  browser_element: string | null;
  risk_hint: string;
  rollback_available?: boolean;
  confidence?: number;
  created_at: string;
}

export interface DecisionResponseSchema {
  schema_version: string;
  run_id: string;
  action_id: string;
  decision: DecisionType;
  risk_level: string;
  risk_score: number;
  reasons: string[];
  triggered_policies: string[];
  sensitive_entities: string[];
  sanitized_payload: string | null;
  next_step: string;
  latency_ms: number;
  created_at: string;
}

export interface ExecutionResponseSchema {
  schema_version: string;
  run_id: string;
  action_id: string;
  executor: string;
  status: "SUCCESS" | "FAILED";
  result_summary: string;
  data: ExecutionData;
  error: string | null;
  latency_ms: number;
  created_at: string;
  execution_status: "SUCCESS" | "FAILED";
}

export interface ExecutionData {
  url: string;
  final_url: string;
  snapshot: Snapshot[];
  selector_map: Record<string, SelectorMap>;
  locator_candidates: LocatorCandidate[];
  final_snapshot: Snapshot[];
  final_selector_map: SelectorMap[];
  action: Action | null;
  actions: Action[];
  action_results: ActionResult[];
  executed: boolean;
}

interface Action {
  type: string;
  label: string;
  element_id: string;
  role: string;
  value: string;
}

interface ActionResult {
  index: number;
  type: string;
  status: "SUCCESS" | "FAILED";
  action: Action;
  final_url: string;
}

interface Snapshot {
  element_id: string;
  role: string;
  label: string;
  risk_hint: string;
  dom: {
    tag: string;
    id: string;
    class: string;
    text: string | null;
    name: string | null;
    title: string | null;
    placeholder: string | null;
    aria_label: string | null;
    test_id: string | null;
    href: string | null;
    visible: boolean;
    disabled: boolean;
  };
}

interface LocatorCandidate {
  element_id: string;
  role: string;
  label: string;
  risk_hint: string;
  locator_candidates: {
    strategy: string;
    role: string;
    name: string;
  }[];
}

interface SelectorMap {
  primary: {
    strategy: string;
    role: string;
    name: string;
  };
  fallbacks: {
    strategy: string;
    value: string;
  }[];
}

export const DUMMY_AGENT_RESPONSE = {
  schema_version: "0.1",
  audit_id: "aud_213608a04dd1",
  run_id: "run_709c199e5cd6",
  action_id: "act_9d916fa9e390",
  request_json: {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    source: "api",
    domain: "browser",
    action_type: "BROWSER_PROTOTYPE_ACTION",
    target_system: "browser",
    target: "https://youtube.com",
    content_context: "",
    payload_summary:
      "3 browser actions on https://youtube.com: fill, submit, screenshot",
    browser_element: null,
    risk_hint: "unknown",
    rollback_available: false,
    confidence: 1.0,
    created_at: "2026-08-07T07:18:59.587418Z",
  },
  decision_json: {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    decision: "ALLOW",
    risk_level: "LOW",
    risk_score: 0.1,
    reasons: ["risk_hint=unknown, domain=browser"],
    triggered_policies: [],
    sensitive_entities: [],
    sanitized_payload: null,
    next_step: "execute",
    latency_ms: 0,
    created_at: "2026-08-07T07:18:59.587430Z",
  },
  execution_json: {
    schema_version: "0.1",
    run_id: "run_709c199e5cd6",
    action_id: "act_9d916fa9e390",
    executor: "browser_prototype_agent",
    status: "SUCCESS",
    result_summary: "executed 3 browser actions",
    data: {
      url: "https://youtube.com",
      final_url: "https://www.youtube.com/results?search_query=prabowo",
      snapshot: [
        {
          element_id: "1",
          role: "button",
          label: "Guide",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: "button",
            class: "style-scope yt-icon-button",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Guide",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "2",
          role: "link",
          label: "YouTube Home",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "logo",
            class: "yt-simple-endpoint style-scope ytd-topbar-logo-renderer",
            text: null,
            name: null,
            title: "YouTube Home",
            placeholder: null,
            aria_label: "",
            test_id: null,
            href: "/",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "3",
          role: "button",
          label: "Skip navigation",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextTonal ytSpecButtonShapeNextMono ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: "Skip navigation",
            name: null,
            title: "",
            placeholder: null,
            aria_label: "Skip navigation",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "4",
          role: "combobox",
          label: "Search",
          risk_hint: "low_risk",
          dom: {
            tag: "input",
            id: null,
            class: "ytSearchboxComponentInput yt-searchbox-input title",
            text: null,
            name: "search_query",
            title: null,
            placeholder: "Search",
            aria_label: null,
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "5",
          role: "button",
          label: "Search with your voice",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextText ytSpecButtonShapeNextMono ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextIconOnlyDefault ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: null,
            name: null,
            title: "",
            placeholder: null,
            aria_label: "Search with your voice",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "6",
          role: "button",
          label: "Settings",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: "button",
            class: "style-scope yt-icon-button",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Settings",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "7",
          role: "link",
          label: "Sign in",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextOutline ytSpecButtonShapeNextCallToAction ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextIconLeading ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: "Sign in",
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Sign in",
            test_id: null,
            href: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "8",
          role: "link",
          label: "Shorts",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "endpoint",
            class:
              "yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer",
            text: "Shorts",
            name: null,
            title: "Shorts",
            placeholder: null,
            aria_label: "Shorts",
            test_id: null,
            href: "/shorts/",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "9",
          role: "link",
          label: "Subscriptions",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "endpoint",
            class:
              "yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer",
            text: "Subscriptions",
            name: null,
            title: "Subscriptions",
            placeholder: null,
            aria_label: "Subscriptions",
            test_id: null,
            href: "/feed/subscriptions",
            visible: true,
            disabled: false,
          },
        },
      ],
      selector_map: {
        "1": {
          primary: { strategy: "role", role: "button", name: "Guide" },
          fallbacks: [],
        },
        "2": {
          primary: { strategy: "role", role: "link", name: "YouTube Home" },
          fallbacks: [],
        },
        "3": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Skip navigation",
          },
          fallbacks: [
            { strategy: "label", value: "Skip navigation" },
            { strategy: "text", value: "Skip navigation" },
          ],
        },
        "4": {
          primary: { strategy: "role", role: "combobox", name: "Search" },
          fallbacks: [{ strategy: "placeholder", value: "Search" }],
        },
        "5": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Search with your voice",
          },
          fallbacks: [{ strategy: "label", value: "Search with your voice" }],
        },
        "6": {
          primary: { strategy: "role", role: "button", name: "Settings" },
          fallbacks: [],
        },
        "7": {
          primary: { strategy: "role", role: "link", name: "Sign in" },
          fallbacks: [{ strategy: "label", value: "Sign in" }],
        },
        "8": {
          primary: { strategy: "role", role: "link", name: "Shorts" },
          fallbacks: [],
        },
        "9": {
          primary: { strategy: "role", role: "link", name: "Subscriptions" },
          fallbacks: [],
        },
      },
      locator_candidates: [
        {
          element_id: "1",
          role: "button",
          label: "Guide",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "button", name: "Guide" },
            { strategy: "label", value: "Guide" },
            { strategy: "css", value: "#button" },
          ],
        },
        {
          element_id: "2",
          role: "link",
          label: "YouTube Home",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "link", name: "YouTube Home" },
            { strategy: "css", value: "#logo" },
          ],
        },
        {
          element_id: "3",
          role: "button",
          label: "Skip navigation",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "button", name: "Skip navigation" },
            { strategy: "label", value: "Skip navigation" },
            { strategy: "text", value: "Skip navigation" },
          ],
        },
        {
          element_id: "4",
          role: "combobox",
          label: "Search",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "combobox", name: "Search" },
            { strategy: "placeholder", value: "Search" },
          ],
        },
        {
          element_id: "5",
          role: "button",
          label: "Search with your voice",
          risk_hint: "low_risk",
          locator_candidates: [
            {
              strategy: "role",
              role: "button",
              name: "Search with your voice",
            },
            { strategy: "label", value: "Search with your voice" },
          ],
        },
        {
          element_id: "6",
          role: "button",
          label: "Settings",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "button", name: "Settings" },
            { strategy: "label", value: "Settings" },
            { strategy: "css", value: "#button" },
          ],
        },
        {
          element_id: "7",
          role: "link",
          label: "Sign in",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "link", name: "Sign in" },
            { strategy: "label", value: "Sign in" },
            { strategy: "text", value: "Sign in" },
          ],
        },
        {
          element_id: "8",
          role: "link",
          label: "Shorts",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "link", name: "Shorts" },
            { strategy: "label", value: "Shorts" },
            { strategy: "text", value: "Shorts" },
            { strategy: "css", value: "#endpoint" },
          ],
        },
        {
          element_id: "9",
          role: "link",
          label: "Subscriptions",
          risk_hint: "low_risk",
          locator_candidates: [
            { strategy: "role", role: "link", name: "Subscriptions" },
            { strategy: "label", value: "Subscriptions" },
            { strategy: "text", value: "Subscriptions" },
            { strategy: "css", value: "#endpoint" },
          ],
        },
      ],
      final_snapshot: [
        {
          element_id: "1",
          role: "button",
          label: "Guide",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: "button",
            class: "style-scope yt-icon-button",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Guide",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "2",
          role: "link",
          label: "YouTube Home",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "logo",
            class: "yt-simple-endpoint style-scope ytd-topbar-logo-renderer",
            text: null,
            name: null,
            title: "YouTube Home",
            placeholder: null,
            aria_label: "",
            test_id: null,
            href: "/",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "3",
          role: "button",
          label: "Skip navigation",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextTonal ytSpecButtonShapeNextMono ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: "Skip navigation",
            name: null,
            title: "",
            placeholder: null,
            aria_label: "Skip navigation",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "4",
          role: "combobox",
          label: "Search",
          risk_hint: "low_risk",
          dom: {
            tag: "input",
            id: null,
            class: "ytSearchboxComponentInput yt-searchbox-input title",
            text: null,
            name: "search_query",
            title: null,
            placeholder: "Search",
            aria_label: null,
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "5",
          role: "button",
          label: "Clear search query",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class: "ytSearchboxComponentClearButton",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Clear search query",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "6",
          role: "button",
          label: "Search with your voice",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextText ytSpecButtonShapeNextMono ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextIconOnlyDefault ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: null,
            name: null,
            title: "",
            placeholder: null,
            aria_label: "Search with your voice",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "7",
          role: "button",
          label: "Settings",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: "button",
            class: "style-scope yt-icon-button",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Settings",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "8",
          role: "link",
          label: "Sign in",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextOutline ytSpecButtonShapeNextCallToAction ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextIconLeading ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: "Sign in",
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Sign in",
            test_id: null,
            href: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252Fresults%253Fsearch_query%253Dprabowo&hl=en&ec=65620",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "9",
          role: "link",
          label: "Subscriptions",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "endpoint",
            class:
              "yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer",
            text: "Subscriptions",
            name: null,
            title: "Subscriptions",
            placeholder: null,
            aria_label: "Subscriptions",
            test_id: null,
            href: "/feed/subscriptions",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "10",
          role: "button",
          label: "Search filters",
          risk_hint: "low_risk",
          dom: {
            tag: "button",
            id: null,
            class:
              "ytSpecButtonShapeNextHost ytSpecButtonShapeNextText ytSpecButtonShapeNextMono ytSpecButtonShapeNextSizeM ytSpecButtonShapeNextIconTrailing ytSpecButtonShapeNextEnableBackdropFilterExperiment ytSpecButtonShapeNextMainstageIconSize ytSpecButtonShapeNextMainstagePadding",
            text: "Filters",
            name: null,
            title: "",
            placeholder: null,
            aria_label: "Search filters",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "11",
          role: "link",
          label:
            "Prabowo: I Prefer Leading with Facts by Kompas.com 7,963 views 18 hours ago 1 minute, 24 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo: I Prefer Leading with Facts",
            name: null,
            title: "Prabowo: I Prefer Leading with Facts",
            placeholder: null,
            aria_label:
              "Prabowo: I Prefer Leading with Facts by Kompas.com 7,963 views 18 hours ago 1 minute, 24 seconds - play Short",
            test_id: null,
            href: "/shorts/QXejMDsr0z4",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "12",
          role: "link",
          label:
            "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana 9 minutes, 18 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana",
            name: null,
            title:
              "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana",
            placeholder: null,
            aria_label:
              "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana 9 minutes, 18 seconds",
            test_id: null,
            href: "/watch?v=tJ4XZBBAnhg&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "13",
          role: "link",
          label:
            "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel 33 minutes",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel",
            name: null,
            title:
              "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel",
            placeholder: null,
            aria_label:
              "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel 33 minutes",
            test_id: null,
            href: "/watch?v=cMEo06NU_ns&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "14",
          role: "link",
          label:
            "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak 3 minutes, 48 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak",
            name: null,
            title:
              "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak",
            placeholder: null,
            aria_label:
              "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak 3 minutes, 48 seconds",
            test_id: null,
            href: "/watch?v=icLoo1v9OSE&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "15",
          role: "link",
          label:
            "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak by SINDOnews 4,343 views 6 hours ago 1 minute, 47 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak",
            name: null,
            title:
              "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak",
            placeholder: null,
            aria_label:
              "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak by SINDOnews 4,343 views 6 hours ago 1 minute, 47 seconds - play Short",
            test_id: null,
            href: "/shorts/aL_CldtCajU",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "16",
          role: "link",
          label: "Go to channel SINDOnews",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel SINDOnews",
            test_id: null,
            href: "/@OfficialSINDOnews",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "17",
          role: "link",
          label:
            "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam! by KOMPASTV 20,838 views 13 hours ago 1 minute, 1 second - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam!",
            name: null,
            title:
              "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam!",
            placeholder: null,
            aria_label:
              "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam! by KOMPASTV 20,838 views 13 hours ago 1 minute, 1 second - play Short",
            test_id: null,
            href: "/shorts/5kZJIe6NUIY",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "18",
          role: "link",
          label:
            "Taklimat Presiden Prabowo Kepada Peneliti BRIN | Breaking News 18 minutes",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Taklimat Presiden Prabowo Kepada Peneliti BRIN | Breaking News",
            name: null,
            title:
              "Taklimat Presiden Prabowo Kepada Peneliti BRIN | Breaking News",
            placeholder: null,
            aria_label:
              "Taklimat Presiden Prabowo Kepada Peneliti BRIN | Breaking News 18 minutes",
            test_id: null,
            href: "/watch?v=nirKuXBORbA&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "19",
          role: "link",
          label: "Go to channel tvOneNews",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel tvOneNews ",
            test_id: null,
            href: "/@tvOneNews",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "20",
          role: "link",
          label:
            "Prabowo Subianto Verified @djojohadikusumo•310K subscribers Presiden Republik Indonesia, Ketua Umum DPP Partai Gerindra. Akun didedikasikan untuk mewujudkan mimpi menghadirkan ...",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "main-link",
            class:
              "channel-link yt-simple-endpoint style-scope ytd-channel-renderer",
            text: "Prabowo Subianto\n@djojohadikusumo•310K subscribers\nPresiden Republik Indonesia, Ketua Umum DPP Partai Gerindra. Akun didedikasikan untuk mewujudkan mimpi menghadirkan ...",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/@djojohadikusumo",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "21",
          role: "link",
          label:
            "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional 4 minutes, 37 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional",
            name: null,
            title:
              "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional",
            placeholder: null,
            aria_label:
              "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional 4 minutes, 37 seconds",
            test_id: null,
            href: "/watch?v=kq8d0o96xSs&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "22",
          role: "link",
          label:
            "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma 2 minutes, 22 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma",
            name: null,
            title:
              "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma",
            placeholder: null,
            aria_label:
              "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma 2 minutes, 22 seconds",
            test_id: null,
            href: "/watch?v=t6z2SVV4Vow&pp=ygUHcHJhYm93b9IHCQnECwGHKiGM7w%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "23",
          role: "button",
          label: "+8 more",
          risk_hint: "low_risk",
          dom: {
            tag: "yt-formatted-string",
            id: null,
            class: "style-scope ytd-vertical-list-renderer",
            text: "+8 More",
            name: null,
            title: null,
            placeholder: null,
            aria_label: "+8 more",
            test_id: null,
            href: null,
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "24",
          role: "link",
          label:
            "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak by Antara TV Indonesia 1,346 views 16 hours ago 39 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak",
            name: null,
            title:
              "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak",
            placeholder: null,
            aria_label:
              "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak by Antara TV Indonesia 1,346 views 16 hours ago 39 seconds - play Short",
            test_id: null,
            href: "/shorts/5zIi_KpkrGg",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "25",
          role: "link",
          label: "Go to channel Antara TV Indonesia",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel Antara TV Indonesia",
            test_id: null,
            href: "/@antaraTV",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "26",
          role: "link",
          label:
            "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia by Tribunnews 4,465 views 1 hour ago 11 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia",
            name: null,
            title:
              "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia",
            placeholder: null,
            aria_label:
              "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia by Tribunnews 4,465 views 1 hour ago 11 seconds - play Short",
            test_id: null,
            href: "/shorts/JXJLOVdkih0",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "27",
          role: "link",
          label: "Go to channel Tribunnews",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel Tribunnews",
            test_id: null,
            href: "/@tribunnews",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "28",
          role: "link",
          label:
            "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia. 1 minute, 30 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia.",
            name: null,
            title:
              "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia.",
            placeholder: null,
            aria_label:
              "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia. 1 minute, 30 seconds",
            test_id: null,
            href: "/watch?v=ECETk1V7Jd8&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "29",
          role: "link",
          label:
            "Prabowo Summons BRIN Leadership to Discuss Priority Program Research 8 minutes, 9 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo Summons BRIN Leadership to Discuss Priority Program Research",
            name: null,
            title:
              "Prabowo Summons BRIN Leadership to Discuss Priority Program Research",
            placeholder: null,
            aria_label:
              "Prabowo Summons BRIN Leadership to Discuss Priority Program Research 8 minutes, 9 seconds",
            test_id: null,
            href: "/watch?v=I9v0CDHfY7o&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "30",
          role: "link",
          label: "Go to channel CNBC Indonesia",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel CNBC Indonesia",
            test_id: null,
            href: "/@CNBC_ID",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "31",
          role: "link",
          label:
            "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist by Warganet id 10,178 views 4 hours ago 17 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist",
            name: null,
            title:
              "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist",
            placeholder: null,
            aria_label:
              "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist by Warganet id 10,178 views 4 hours ago 17 seconds - play Short",
            test_id: null,
            href: "/shorts/8e5epianLV4",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "32",
          role: "link",
          label: "Go to channel Warganet id",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel Warganet id",
            test_id: null,
            href: "/@warganetid98",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "33",
          role: "link",
          label: "Purbaya Yudhi Sadewa",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Purbaya Yudhi Sadewa",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Purbaya+Yudhi+Sadewa&sp=EiiSASUKDS9nLzExZzltcmx4cG4qFFB1cmJheWEgWXVkaGkgU2FkZXdheAE%253D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "34",
          role: "link",
          label: "Teddy Indra Wijaya",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Teddy Indra Wijaya",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Teddy+Indra+Wijaya&sp=EiaSASMKDS9nLzExdngxNl81ZzYqElRlZGR5IEluZHJhIFdpamF5YXgB",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "35",
          role: "link",
          label: "Hashim Djojohadikusumo",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Hashim Djojohadikusumo",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Hashim+Djojohadikusumo&sp=EieSASQKCi9tLzB2X2I3MzgqFkhhc2hpbSBEam9qb2hhZGlrdXN1bW94AQ%253D%253D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "36",
          role: "link",
          label: "Luhut Binsar Pandjaitan",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Luhut Binsar Pandjaitan",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Luhut+Binsar+Pandjaitan&sp=EimSASYKCy9nLzEyMmhjdnB0KhdMdWh1dCBCaW5zYXIgUGFuZGphaXRhbngB",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "37",
          role: "link",
          label: "Megawati Sukarnoputri",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Megawati Sukarnoputri",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Megawati+Sukarnoputri&sp=EiWSASIKCS9tLzAxamdsaCoVTWVnYXdhdGkgU3VrYXJub3B1dHJpeAE%253D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "38",
          role: "link",
          label: "Nadiem Makarim",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Nadiem Makarim",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Nadiem+Makarim&sp=EiKSAR8KDS9nLzExY2tyenI5YzEqDk5hZGllbSBNYWthcmlteAE%253D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "39",
          role: "link",
          label: "B. J. Habibie",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "B. J. Habibie",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=B.+J.+Habibie&sp=Eh2SARoKCS9tLzAxcXdwdCoNQi4gSi4gSGFiaWJpZXgB",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "40",
          role: "link",
          label: "Sjafrie Sjamsoeddin",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Sjafrie Sjamsoeddin",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Sjafrie+Sjamsoeddin&sp=EiWSASIKCy9nLzEyMTRmbjgwKhNTamFmcmllIFNqYW1zb2VkZGlueAE%253D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "41",
          role: "link",
          label: "Vladimir Putin",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: null,
            class:
              "yt-simple-endpoint style-scope ytd-search-refinement-card-renderer",
            text: "Vladimir Putin",
            name: null,
            title: null,
            placeholder: null,
            aria_label: null,
            test_id: null,
            href: "/results?search_query=Vladimir+Putin&sp=Eh2SARoKCC9tLzA4MTkzKg5WbGFkaW1pciBQdXRpbngB",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "42",
          role: "link",
          label:
            "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon 8 minutes, 34 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon",
            name: null,
            title:
              "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon",
            placeholder: null,
            aria_label:
              "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon 8 minutes, 34 seconds",
            test_id: null,
            href: "/watch?v=DQLF8CTbXi4&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "43",
          role: "link",
          label:
            "Prabowo and Gibran Speak Out #prabowo #latestnews by Ruhul Aulia Ilmi 301,221 views 1 day ago 8 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo and Gibran Speak Out #prabowo #latestnews",
            name: null,
            title: "Prabowo and Gibran Speak Out #prabowo #latestnews",
            placeholder: null,
            aria_label:
              "Prabowo and Gibran Speak Out #prabowo #latestnews by Ruhul Aulia Ilmi 301,221 views 1 day ago 8 seconds - play Short",
            test_id: null,
            href: "/shorts/H54tBjyR3GI",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "44",
          role: "link",
          label: "Go to channel Ruhul Aulia Ilmi",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel Ruhul Aulia Ilmi",
            test_id: null,
            href: "/@RuhulAuliaIlmi",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "45",
          role: "link",
          label:
            "Prabowo Needs to Wake Up! 👀 | Feri Amsari by Kucing Mujair 322,791 views 2 days ago 1 minute, 56 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo Needs to Wake Up! 👀 | Feri Amsari",
            name: null,
            title: "Prabowo Needs to Wake Up! 👀 | Feri Amsari",
            placeholder: null,
            aria_label:
              "Prabowo Needs to Wake Up! 👀 | Feri Amsari by Kucing Mujair 322,791 views 2 days ago 1 minute, 56 seconds - play Short",
            test_id: null,
            href: "/shorts/YN9CvsvpA7w",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "46",
          role: "link",
          label: "Go to channel Kucing Mujair",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel Kucing Mujair",
            test_id: null,
            href: "/@Kucing.Mujair100",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "47",
          role: "link",
          label:
            "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26 by RANGKUMAN PODCAST 33,624 views 9 hours ago 2 minutes, 5 seconds - play Short",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26",
            name: null,
            title:
              "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26",
            placeholder: null,
            aria_label:
              "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26 by RANGKUMAN PODCAST 33,624 views 9 hours ago 2 minutes, 5 seconds - play Short",
            test_id: null,
            href: "/shorts/Mr9kDf8hyPg",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "48",
          role: "link",
          label: "Go to channel RANGKUMAN PODCAST",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "channel-thumbnail",
            class: "style-scope ytd-video-renderer",
            text: null,
            name: null,
            title: null,
            placeholder: null,
            aria_label: "Go to channel RANGKUMAN PODCAST",
            test_id: null,
            href: "/@RANGKUMANPODCAST26",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "49",
          role: "link",
          label:
            "Prabowo Throws and Steps on Roof Tiles Made by BRIN 3 minutes, 45 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Prabowo Throws and Steps on Roof Tiles Made by BRIN",
            name: null,
            title: "Prabowo Throws and Steps on Roof Tiles Made by BRIN",
            placeholder: null,
            aria_label:
              "Prabowo Throws and Steps on Roof Tiles Made by BRIN 3 minutes, 45 seconds",
            test_id: null,
            href: "/watch?v=4whFe1mgOEc&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "50",
          role: "link",
          label:
            "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ... 4 minutes, 27 seconds",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ...",
            name: null,
            title:
              "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ...",
            placeholder: null,
            aria_label:
              "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ... 4 minutes, 27 seconds",
            test_id: null,
            href: "/watch?v=rERTNXl_Pd4&pp=ygUHcHJhYm93b9IHCQnECwGHKiGM7w%3D%3D",
            visible: true,
            disabled: false,
          },
        },
        {
          element_id: "51",
          role: "link",
          label:
            "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
          risk_hint: "low_risk",
          dom: {
            tag: "a",
            id: "video-title",
            class: "yt-simple-endpoint style-scope ytd-video-renderer",
            text: "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
            name: null,
            title:
              "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
            placeholder: null,
            aria_label:
              "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
            test_id: null,
            href: "/watch?v=-RNS7jw8QV0&pp=ygUHcHJhYm93bw%3D%3D",
            visible: true,
            disabled: false,
          },
        },
      ],
      final_selector_map: {
        "1": {
          primary: { strategy: "role", role: "button", name: "Guide" },
          fallbacks: [],
        },
        "2": {
          primary: { strategy: "role", role: "link", name: "YouTube Home" },
          fallbacks: [],
        },
        "3": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Skip navigation",
          },
          fallbacks: [
            { strategy: "label", value: "Skip navigation" },
            { strategy: "text", value: "Skip navigation" },
          ],
        },
        "4": {
          primary: { strategy: "role", role: "combobox", name: "Search" },
          fallbacks: [{ strategy: "placeholder", value: "Search" }],
        },
        "5": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Clear search query",
          },
          fallbacks: [{ strategy: "label", value: "Clear search query" }],
        },
        "6": {
          primary: {
            strategy: "role",
            role: "button",
            name: "Search with your voice",
          },
          fallbacks: [{ strategy: "label", value: "Search with your voice" }],
        },
        "7": {
          primary: { strategy: "role", role: "button", name: "Settings" },
          fallbacks: [],
        },
        "8": {
          primary: { strategy: "role", role: "link", name: "Sign in" },
          fallbacks: [{ strategy: "label", value: "Sign in" }],
        },
        "9": {
          primary: { strategy: "role", role: "link", name: "Subscriptions" },
          fallbacks: [],
        },
        "10": {
          primary: { strategy: "role", role: "button", name: "Search filters" },
          fallbacks: [{ strategy: "label", value: "Search filters" }],
        },
        "11": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo: I Prefer Leading with Facts by Kompas.com 7,963 views 18 hours ago 1 minute, 24 seconds - play Short",
          },
          fallbacks: [
            { strategy: "text", value: "Prabowo: I Prefer Leading with Facts" },
          ],
        },
        "12": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana 9 minutes, 18 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Kejutan! Momen Prabowo Banting dan Injak-Injak Produk Temuan Penting Periset di Istana",
            },
          ],
        },
        "13": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel 33 minutes",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Momen Prabowo Coba Banting dan Injak Genteng Peneliti BRIN hingga Motor Listrik Khusus Difabel",
            },
          ],
        },
        "14": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak 3 minutes, 48 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Presiden Prabowo Cicipi Air Olahan Banjir Peneliti BRIN: Bu Mega Minum, Masa Prabowo Tidak",
            },
          ],
        },
        "15": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak by SINDOnews 4,343 views 6 hours ago 1 minute, 47 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Prabowo: Saya Suka Memimpin dengan Fakta Meski Kadang Terlihat Tidak Enak",
            },
          ],
        },
        "16": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel SINDOnews",
          },
          fallbacks: [{ strategy: "label", value: "Go to channel SINDOnews" }],
        },
        "17": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam! by KOMPASTV 20,838 views 13 hours ago 1 minute, 1 second - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Lagi, Prabowo Singgung Timnas Indonesia Tak Mampu Masuk Piala Dunia: Jangan Cari Kambing Hitam!",
            },
          ],
        },
        "18": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Taklimat Presiden Prabowo Kepada Peneliti BRIN | Breaking News 18 minutes",
          },
          fallbacks: [],
        },
        "19": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel tvOneNews",
          },
          fallbacks: [{ strategy: "label", value: "Go to channel tvOneNews " }],
        },
        "20": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo Subianto Verified @djojohadikusumo•310K subscribers Presiden Republik Indonesia, Ketua Umum DPP Partai Gerindra. Akun didedikasikan untuk mewujudkan mimpi menghadirkan ...",
          },
          fallbacks: [{ strategy: "css", value: "#main-link" }],
        },
        "21": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional 4 minutes, 37 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Pertemuan Presiden Prabowo dengan 150 Periset dari Badan Riset dan Inovasi Nasional",
            },
          ],
        },
        "22": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma 2 minutes, 22 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Presiden Prabowo Antar Kepulangan PM Tailan di Lanud Halim Perdanakusuma",
            },
          ],
        },
        "23": {
          primary: { strategy: "role", role: "button", name: "+8 more" },
          fallbacks: [
            { strategy: "label", value: "+8 more" },
            { strategy: "text", value: "+8 More" },
          ],
        },
        "24": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak by Antara TV Indonesia 1,346 views 16 hours ago 39 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Genteng inovasi BRIN diuji langsung Prabowo, dibanting hingga diinjak",
            },
          ],
        },
        "25": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel Antara TV Indonesia",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel Antara TV Indonesia" },
          ],
        },
        "26": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia by Tribunnews 4,465 views 1 hour ago 11 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Arahan Presiden Prabowo ke Ilmuwan BRIN saat Dijelaskan Perkembangan Teknologi Nuklir Indonesia",
            },
          ],
        },
        "27": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel Tribunnews",
          },
          fallbacks: [{ strategy: "label", value: "Go to channel Tribunnews" }],
        },
        "28": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia. 1 minute, 30 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Pertemuan Presiden Prabowo dengan Pengusaha KADIN Pusat dan Daerah Seluruh Indonesia.",
            },
          ],
        },
        "29": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo Summons BRIN Leadership to Discuss Priority Program Research 8 minutes, 9 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Prabowo Summons BRIN Leadership to Discuss Priority Program Research",
            },
          ],
        },
        "30": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel CNBC Indonesia",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel CNBC Indonesia" },
          ],
        },
        "31": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist by Warganet id 10,178 views 4 hours ago 17 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Activist blasts President Prabowo. 08/07 #prabowo #criticism #activist",
            },
          ],
        },
        "32": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel Warganet id",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel Warganet id" },
          ],
        },
        "33": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Purbaya Yudhi Sadewa",
          },
          fallbacks: [{ strategy: "text", value: "Purbaya Yudhi Sadewa" }],
        },
        "34": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Teddy Indra Wijaya",
          },
          fallbacks: [{ strategy: "text", value: "Teddy Indra Wijaya" }],
        },
        "35": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Hashim Djojohadikusumo",
          },
          fallbacks: [{ strategy: "text", value: "Hashim Djojohadikusumo" }],
        },
        "36": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Luhut Binsar Pandjaitan",
          },
          fallbacks: [{ strategy: "text", value: "Luhut Binsar Pandjaitan" }],
        },
        "37": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Megawati Sukarnoputri",
          },
          fallbacks: [{ strategy: "text", value: "Megawati Sukarnoputri" }],
        },
        "38": {
          primary: { strategy: "role", role: "link", name: "Nadiem Makarim" },
          fallbacks: [{ strategy: "text", value: "Nadiem Makarim" }],
        },
        "39": {
          primary: { strategy: "role", role: "link", name: "B. J. Habibie" },
          fallbacks: [{ strategy: "text", value: "B. J. Habibie" }],
        },
        "40": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Sjafrie Sjamsoeddin",
          },
          fallbacks: [{ strategy: "text", value: "Sjafrie Sjamsoeddin" }],
        },
        "41": {
          primary: { strategy: "role", role: "link", name: "Vladimir Putin" },
          fallbacks: [{ strategy: "text", value: "Vladimir Putin" }],
        },
        "42": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon 8 minutes, 34 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Ahli BRIN Bahas Potensi Nuklir RI, Prabowo Langsung Larang Pakai Mikrofon",
            },
          ],
        },
        "43": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo and Gibran Speak Out #prabowo #latestnews by Ruhul Aulia Ilmi 301,221 views 1 day ago 8 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value: "Prabowo and Gibran Speak Out #prabowo #latestnews",
            },
          ],
        },
        "44": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel Ruhul Aulia Ilmi",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel Ruhul Aulia Ilmi" },
          ],
        },
        "45": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo Needs to Wake Up! 👀 | Feri Amsari by Kucing Mujair 322,791 views 2 days ago 1 minute, 56 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value: "Prabowo Needs to Wake Up! 👀 | Feri Amsari",
            },
          ],
        },
        "46": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel Kucing Mujair",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel Kucing Mujair" },
          ],
        },
        "47": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26 by RANGKUMAN PODCAST 33,624 views 9 hours ago 2 minutes, 5 seconds - play Short",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Masih Bisakah Kita Berharap Pada Prabowo? #prabowo #prabowosubianto #shorts #rangkumanpodcast26",
            },
          ],
        },
        "48": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Go to channel RANGKUMAN PODCAST",
          },
          fallbacks: [
            { strategy: "label", value: "Go to channel RANGKUMAN PODCAST" },
          ],
        },
        "49": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Prabowo Throws and Steps on Roof Tiles Made by BRIN 3 minutes, 45 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value: "Prabowo Throws and Steps on Roof Tiles Made by BRIN",
            },
          ],
        },
        "50": {
          primary: {
            strategy: "role",
            role: "link",
            name: "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ... 4 minutes, 27 seconds",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "Tak Terduga! Prabowo Depan Bos Lion Air Cs: Presiden-Presiden Berikutnya ...",
            },
          ],
        },
        "51": {
          primary: {
            strategy: "role",
            role: "link",
            name: "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
          },
          fallbacks: [
            {
              strategy: "text",
              value:
                "🔴BREAKING NEWS - Presiden Prabowo Hadiri Peluncuran Buku Bahlil Lahadalia",
            },
          ],
        },
      },
      action: null,
      actions: [
        {
          type: "fill",
          label: "Search",
          element_id: "4",
          role: "combobox",
          value: "prabowo",
        },
        {
          type: "submit",
          label: "Search",
          element_id: "4",
          role: "combobox",
          delay_ms: 2000,
        },
        {
          type: "screenshot",
          path: "data/browser/screenshots/act_9d916fa9e390_03.png",
        },
      ],
      action_results: [
        {
          index: 1,
          type: "fill",
          status: "SUCCESS",
          action: {
            type: "fill",
            label: "Search",
            element_id: "4",
            role: "combobox",
            value: "prabowo",
          },
          final_url: "https://www.youtube.com/",
        },
        {
          index: 2,
          type: "submit",
          status: "SUCCESS",
          action: {
            type: "submit",
            label: "Search",
            element_id: "4",
            role: "combobox",
            delay_ms: 2000,
          },
          final_url: "https://www.youtube.com/results?search_query=prabowo",
        },
        {
          index: 3,
          type: "screenshot",
          status: "SUCCESS",
          action: {
            type: "screenshot",
            path: "data/browser/screenshots/act_9d916fa9e390_03.png",
          },
          final_url: "https://www.youtube.com/results?search_query=prabowo",
        },
      ],
      executed: true,
    },
    error: null,
    latency_ms: 28239,
    created_at: "2026-08-07T07:19:27.824704Z",
  },
  execution_status: "SUCCESS",
  error_type: null,
  policy_version: "policy-0.1",
  detector_version: "detector-0.1",
  latency: { guardrail_ms: 0, executor_ms: 28239, total_ms: 28348 },
  created_at: "2026-08-07T07:19:27.935896Z",
};
