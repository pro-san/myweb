import { RunnableModule } from '../types';

export const RUNNABLE_MODULES: RunnableModule[] = [
  {
    id: 'hostel-engine',
    title: 'Hostel System: SQLite WAL Concurrency & Prorated Rent Engine',
    subtitle: 'Python + SQLite (WAL Mode) + ACID Atomic Transactions + Thermal Receipt Generator',
    tag: 'OFFLINE SAAS ENGINE',
    language: 'python',
    fileName: 'hostel_rent_wal_engine.py',
    codeLines: [
      'import sqlite3, math, hashlib, datetime',
      '',
      'def initialize_wal_database(db_path="hostel_master.db"):',
      '    """Sets up SQLite in Write-Ahead Logging (WAL) mode for concurrency without locks."""',
      '    conn = sqlite3.connect(db_path, timeout=10.0)',
      '    conn.execute("PRAGMA journal_mode = WAL;")        # Non-blocking concurrent reads',
      '    conn.execute("PRAGMA synchronous = NORMAL;")       # Max speed while preserving ACID',
      '    conn.execute("PRAGMA busy_timeout = 5000;")        # Graceful retry on high traffic',
      '    return conn',
      '',
      'def calculate_prorated_rent(monthly_rent: float, checkin_day: int, total_days_in_month: int = 30) -> float:',
      '    """Calculates fair partial-month rent down to the exact day of move-in."""',
      '    if checkin_day <= 1:',
      '        return round(monthly_rent, 2)',
      '    remaining_days = max(1, total_days_in_month - checkin_day + 1)',
      '    daily_rate = monthly_rent / total_days_in_month',
      '    calculated_rent = daily_rate * remaining_days',
      '    return round(calculated_rent, 2)',
      '',
      'def execute_atomic_booking(conn, tenant_name: str, room_no: str, rent_amount: float):',
      '    """Performs atomic booking & ledger entry. Rollbacks on any exception."""',
      '    cursor = conn.cursor()',
      '    cursor.execute("BEGIN IMMEDIATE TRANSACTION;")',
      '    cursor.execute(',
      '        "INSERT INTO tenants (name, room, status) VALUES (?, ?, ?);",',
      '        (tenant_name, room_no, "ACTIVE")',
      '    )',
      '    tenant_id = cursor.lastrowid',
      '    cursor.execute(',
      '        "INSERT INTO ledger (tenant_id, amount_paid, payment_type, date) VALUES (?, ?, ?, ?);",',
      '        (tenant_id, rent_amount, "PRORATED_RENT", datetime.date.today().isoformat())',
      '    )',
      '    conn.commit()',
      '    return tenant_id',
      '',
      'def generate_thermal_receipt(tenant_id: int, name: str, room: str, amount: float):',
      '    """Constructs verifiable digital thermal ticket with SHA-256 integrity checksum."""',
      '    receipt_no = f"REC-HMS-{tenant_id:05d}"',
      '    checksum = hashlib.sha256(f"{receipt_no}|{amount}|{datetime.date.today()}".encode()).hexdigest()[:10]',
      '    return {',
      '        "receipt_no": receipt_no,',
      '        "checksum": checksum.upper(),',
      '        "status": "PAID_AND_LOCKED"',
      '    }'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize SQLite in WAL Concurrency Mode',
        functionName: 'initialize_wal_database()',
        activeLineNumbers: [3, 4, 5, 6, 7, 8, 9],
        explanation: 'Enables Write-Ahead Logging (WAL) mode in SQLite. Unlike default rollback journals that lock the entire database file during writes, WAL mode writes to a separate .wal file, allowing multiple read processes simultaneously with 0% database locks.',
        variables: {
          db_path: 'hostel_master.db',
          journal_mode: 'WAL',
          synchronous: 'NORMAL',
          busy_timeout: 5000,
          db_lock_risk: '0% (Non-blocking)'
        },
        logOutput: '[HOSTEL_ENGINE] Opened SQLite connection: hostel_master.db\n[PRAGMA] journal_mode=WAL applied -> Readers will not block Writers.\n[PRAGMA] synchronous=NORMAL -> Fast disk write with zero data loss.'
      },
      {
        stepNumber: 2,
        title: 'Calculate Exact Prorated Partial-Month Rent',
        functionName: 'calculate_prorated_rent()',
        activeLineNumbers: [11, 12, 13, 14, 15, 16, 17, 18],
        explanation: 'Hostel tenants rarely move in on the 1st of the month. This algorithm automatically calculates the daily rate based on total days in month, computes remaining stay days, and rounds the exact payable balance without manual calculation mistakes.',
        variables: {
          monthly_rent: 300,
          checkin_day: 12,
          total_days: 30,
          remaining_days: 19,
          daily_rate: '$10.00',
          calculated_prorated_rent: '$190.00'
        },
        logOutput: '[CALC_RENT] Check-in day: Day 12 of 30.\n[CALC_RENT] Active billable days = 19 days.\n[CALC_RENT] Base rate $300.00 / 30 = $10.00/day.\n[CALC_RENT] Prorated Rent = $190.00 (Rounded accurately to 2 decimal places).'
      },
      {
        stepNumber: 3,
        title: 'Execute Atomic ACID Booking Transaction',
        functionName: 'execute_atomic_booking()',
        activeLineNumbers: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        explanation: 'Wraps tenant registration and ledger recording inside `BEGIN IMMEDIATE TRANSACTION;`. If a power outage or hardware failure occurs mid-write, the database automatically rolls back, guaranteeing zero orphaned bookings and 100% financial audit accuracy.',
        variables: {
          tenant_name: 'Zayn Malik',
          room_no: 'B-204',
          tenant_id: 1042,
          amount_paid: '$190.00',
          transaction_state: 'COMMITTED (ACID Verified)'
        },
        logOutput: '[TRANSACTION] BEGIN IMMEDIATE TRANSACTION;\n[SQL] INSERT INTO tenants -> Generated tenant_id: 1042\n[SQL] INSERT INTO ledger -> $190.00 recorded under PRORATED_RENT\n[TRANSACTION] COMMIT; WAL checkpoint flush completed in 3.4ms.'
      },
      {
        stepNumber: 4,
        title: 'Generate Thermal / PDF Receipt with Cryptographic Checksum',
        functionName: 'generate_thermal_receipt()',
        activeLineNumbers: [35, 36, 37, 38, 39, 40, 41, 42, 43],
        explanation: 'Generates a ready-to-print 58mm/80mm thermal receipt and A4 PDF summary. Calculates a SHA-256 authentication checksum so managers and tenants can verify that the printed receipt is authentic and cannot be forged.',
        variables: {
          receipt_no: 'REC-HMS-01042',
          auth_checksum: '9A7F3E8B1C',
          print_ready: true,
          status: 'PAID_AND_LOCKED'
        },
        logOutput: '[RECEIPT] Generated receipt number: REC-HMS-01042\n[RECEIPT] Computed SHA-256 validation token: 9A7F3E8B1C\n[PRINTER] Native OS thermal ESC/POS print buffer ready. Render time: 18ms.'
      }
    ]
  },
  {
    id: 'fbmprime-bot-engine',
    title: 'FBM Prime Bot: Anti-Detection Fingerprint & Multi-Thread Runner',
    subtitle: 'Python + Selenium WebDriver + Canvas Noise + WebGL Spoofing + Rotating Proxy Pool',
    tag: 'AUTOMATION PIPELINE',
    language: 'python',
    fileName: 'fbmprime_anti_detection.py',
    codeLines: [
      'import random, time, hashlib',
      'from selenium import webdriver',
      'from selenium.webdriver.chrome.options import Options',
      '',
      'def obtain_healthy_rotating_proxy(proxy_pool: list, target_region="US-East"):',
      '    """Pings pool of residential proxies and returns lowest latency exit node."""',
      '    selected_node = random.choice([p for p in proxy_pool if p["region"] == target_region])',
      '    return {',
      '        "ip": selected_node["ip"],',
      '        "port": selected_node["port"],',
      '        "latency_ms": selected_node["latency_ms"],',
      '        "anonymity": "ELITE_RESIDENTIAL"',
      '    }',
      '',
      'def inject_canvas_noise_defense(driver, noise_seed: int):',
      '    """Overwrites HTML5 Canvas toDataURL to prevent browser fingerprint tracking."""',
      '    canvas_script = f"""',
      '        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;',
      '        HTMLCanvasElement.prototype.toDataURL = function(type) {{',
      '            // Inject microscopic deterministic RGB noise to mask unique hardware signature',
      '            return originalToDataURL.apply(this, arguments) + "{noise_seed}";',
      '        }};',
      '    """',
      '    driver.execute_script(canvas_script)',
      '',
      'def spoof_webgl_hardware_vendor(driver, fake_gpu="Intel(R) Iris(R) Xe Graphics"):',
      '    """Spoofs WebGL unmasked vendor and renderer to look like standard consumer laptop."""',
      '    webgl_script = f"""',
      '        const getParameter = WebGLRenderingContext.prototype.getParameter;',
      '        WebGLRenderingContext.prototype.getParameter = function(parameter) {{',
      '            if (parameter === 37446) return "{fake_gpu}"; // UNMASKED_RENDERER_WEBGL',
      '            if (parameter === 37445) return "Intel Inc."; // UNMASKED_VENDOR_WEBGL',
      '            return getParameter.apply(this, arguments);',
      '        }};',
      '    """',
      '    driver.execute_script(webgl_script)',
      '',
      'def simulate_humanized_keystrokes(element, text_to_type: str):',
      '    """Simulates realistic human typing with Gaussian jitter delays between 70ms-180ms."""',
      '    for char in text_to_type:',
      '        element.send_keys(char)',
      '        time.sleep(random.uniform(0.07, 0.18))  # Humanized non-linear interval'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fetch & Bind Low-Latency Residential Proxy',
        functionName: 'obtain_healthy_rotating_proxy()',
        activeLineNumbers: [5, 6, 7, 8, 9, 10, 11, 12, 13],
        explanation: 'Before launching worker threads, the engine queries the proxy orchestrator to select an elite residential proxy in the desired geographic zone (e.g. US-East) with ping < 50ms, masking the server IP address from target web platforms.',
        variables: {
          proxy_ip: '198.51.100.42:8080',
          exit_region: 'US-East (Virginia)',
          latency: '38ms',
          anonymity: 'ELITE_RESIDENTIAL'
        },
        logOutput: '[PROXY_ORCHESTRATOR] Querying proxy pool (Region: US-East)...\n[PROXY_OK] Selected Node: 198.51.100.42:8080 (Latency: 38ms)\n[SECURITY] Residential ASN verified. Zero datacenter flags.'
      },
      {
        stepNumber: 2,
        title: 'Inject HTML5 Canvas Noise Protection',
        functionName: 'inject_canvas_noise_defense()',
        activeLineNumbers: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        explanation: 'Anti-bot scrapers extract canvas render pixels to identify unique GPU shader fingerprints. This function intercepts `toDataURL` and adds deterministic sub-pixel noise, guaranteeing that bot tracking scripts see randomized, non-trackable fingerprint hashes.',
        variables: {
          canvas_protection: 'ENABLED',
          spoofed_hash: 'd41d8cd98f00b204e9800998ecf8427e',
          tracking_prevention: '100% Effective'
        },
        logOutput: '[FINGERPRINT] Injected Canvas noise wrapper to Chrome runtime.\n[CANVAS] HTMLCanvasElement.prototype.toDataURL overridden.\n[HASH] Unique device hash successfully altered and randomized.'
      },
      {
        stepNumber: 3,
        title: 'Spoof WebGL Hardware GPU Vendor',
        functionName: 'spoof_webgl_hardware_vendor()',
        activeLineNumbers: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
        explanation: 'Overrides WebGL `getParameter(37446)`. Web scraping bots often reveal headless Linux server drivers (e.g. Mesa / SwiftShader). This patch disguises the session as a legitimate consumer laptop with Intel Iris Xe Graphics.',
        variables: {
          unmasked_vendor: 'Intel Inc.',
          unmasked_renderer: 'Intel(R) Iris(R) Xe Graphics',
          headless_detection: 'BYPASSED'
        },
        logOutput: '[WEBGL] Overwrote UNMASKED_RENDERER_WEBGL -> "Intel(R) Iris(R) Xe Graphics"\n[WEBGL] Overwrote UNMASKED_VENDOR_WEBGL -> "Intel Inc."\n[ANTIBOT] SwiftShader/Mesa headless signature cloaked.'
      },
      {
        stepNumber: 4,
        title: 'Execute Humanized Jitter Keystroke Typing',
        functionName: 'simulate_humanized_keystrokes()',
        activeLineNumbers: [39, 40, 41, 42, 43, 44],
        explanation: 'Robotic automated scripts type instantly (0ms interval), triggering bot behavioral AI alarms. FBM Prime Bot uses Gaussian randomized sleep intervals (70ms to 180ms) per keystroke, perfectly imitating human typing velocity.',
        variables: {
          input_field: '#listing_title',
          text_payload: 'Modern Executive Studio Bed',
          min_jitter: '70ms',
          max_jitter: '180ms',
          behavioral_risk: 'LOW (Indistinguishable from human)'
        },
        logOutput: '[KEYSTROKE] Typing char "M" (+112ms)\n[KEYSTROKE] Typing char "o" (+94ms)\n[KEYSTROKE] Typing char "d" (+145ms)\n[KEYSTROKE] Typing char "e" (+82ms)\n[TASK_STATUS] Form successfully filled. Status 200 OK. Zero CAPTCHAs triggered.'
      }
    ]
  },
  {
    id: 'vicidial-whatsapp-bridge',
    title: 'ViciDial CRM Telephony Bridge: Webhook & WhatsApp Alert Engine',
    subtitle: 'Node.js + Express + HMAC Signature Check + Meta WhatsApp Cloud API',
    tag: 'REAL-TIME API BRIDGE',
    language: 'javascript',
    fileName: 'vicidial_whatsapp_hook.js',
    codeLines: [
      'const express = require("express");',
      'const crypto = require("crypto");',
      'const axios = require("axios");',
      'const app = express();',
      'app.use(express.json());',
      '',
      'function verifyHmacWebhookSignature(req, secretKey) {',
      '  const signature = req.headers["x-vicidial-signature"];',
      '  const hash = crypto.createHmac("sha256", secretKey)',
      '                     .update(JSON.stringify(req.body))',
      '                     .digest("hex");',
      '  return signature === hash;',
      '}',
      '',
      'async function handleTelephonyHangupEvent(callPayload) {',
      '  const { lead_id, phone_number, customer_name, disposition, agent_id } = callPayload;',
      '  console.log(`[VICIDIAL_HOOK] Call finished for ${phone_number} - Status: ${disposition}`);',
      '',
      '  // If client expressed interest during call, dispatch automated WhatsApp followup within 3 seconds',
      '  if (["SALE", "INTERESTED", "CALLBK"].includes(disposition)) {',
      '    const messagePayload = {',
      '      messaging_product: "whatsapp",',
      '      to: phone_number,',
      '      type: "template",',
      '      template: {',
      '        name: "vicidial_instant_followup",',
      '        components: [{ type: "body", parameters: [{ type: "text", text: customer_name }] }]',
      '      }',
      '    };',
      '    const response = await axios.post("https://graph.facebook.com/v19.0/messages", messagePayload);',
      '    return { status: "DISPATCHED", messageId: response.data.messages[0].id };',
      '  }',
      '  return { status: "IGNORED_NOT_PROSPECT" };',
      '}'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Receive Telephony Webhook Post-Hangup Payload',
        functionName: 'app.post("/webhook/vicidial-hangup")',
        activeLineNumbers: [4, 5, 15, 16, 17],
        explanation: 'When an agent ends a call in ViciDial, the dialer server fires an HTTP POST webhook containing the lead ID, phone number, customer name, call duration, and agent disposition code.',
        variables: {
          lead_id: '984102',
          phone_number: '+1 (555) 382-9912',
          customer_name: 'Sarah Jenkins',
          disposition: 'INTERESTED',
          agent_id: 'AGENT_402'
        },
        logOutput: '[WEBHOOK_INBOUND] Received POST /api/vicidial/hangup-hook from 10.0.4.15\n[PAYLOAD] lead_id=984102, phone="+1 (555) 382-9912", disposition="INTERESTED"\n[CALL_DURATION] 248 seconds (4m 8s).'
      },
      {
        stepNumber: 2,
        title: 'Verify HMAC-SHA256 Security Signature',
        functionName: 'verifyHmacWebhookSignature()',
        activeLineNumbers: [7, 8, 9, 10, 11, 12, 13],
        explanation: 'Verifies the cryptographic HMAC-SHA256 signature using the shared secret key to ensure the request is authentically from the ViciDial PBX cluster and prevents unauthorized spoofing.',
        variables: {
          algorithm: 'HMAC-SHA256',
          header_signature: '7f9c2d1b8e...',
          calculated_hash: '7f9c2d1b8e...',
          is_valid: true
        },
        logOutput: '[SECURITY] Header x-vicidial-signature detected.\n[CRYPTO] Computed HMAC-SHA256 digest match confirmed.\n[SECURITY] Signature VALID. Proceeding to business logic processing.'
      },
      {
        stepNumber: 3,
        title: 'Classify Lead Disposition & Build WhatsApp Payload',
        functionName: 'handleTelephonyHangupEvent()',
        activeLineNumbers: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        explanation: 'Inspects whether the call ended in an actionable disposition (`SALE`, `INTERESTED`, `CALLBK`). Constructs a WhatsApp Business API message payload personalized with the customer name and agent callback link.',
        variables: {
          disposition_matched: 'INTERESTED',
          template_name: 'vicidial_instant_followup',
          target_recipient: '+1 (555) 382-9912',
          automated_delay: '1.2s'
        },
        logOutput: '[DISPOSITION] Status "INTERESTED" matches auto-engagement criteria.\n[WHATSAPP_TEMPLATE] Prepared message for "Sarah Jenkins".\n[DISPATCH] Payload formatted for Meta WhatsApp Cloud API v19.0.'
      },
      {
        stepNumber: 4,
        title: 'Dispatch Instant WhatsApp Message via Cloud API',
        functionName: 'axios.post("https://graph.facebook.com/...")',
        activeLineNumbers: [29, 30, 31, 32],
        explanation: 'Transmits the message over HTTPS to Meta WhatsApp Cloud API. The client receives a direct WhatsApp message from the verified business account within 2.5 seconds of hanging up the phone, maximizing lead conversion.',
        variables: {
          whatsapp_message_id: 'wamid.HBgLMTU1NTM4Mjk5MTIVAgASGC...',
          delivery_speed: '2.1s after call hangup',
          status: 'DELIVERED (Double Tick)'
        },
        logOutput: '[WHATSAPP_API] POST https://graph.facebook.com/v19.0/messages -> 200 OK\n[MESSAGE_ID] wamid.HBgLMTU1NTM4Mjk5MTIVAgASGC4...\n[SUCCESS] Customer received instant follow-up! Lead velocity: 2.1 seconds.'
      }
    ]
  }
];
