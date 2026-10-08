export type Lang = 'es' | 'en';

export const translations = {
  es: {
    app_name: 'MicroGuide',
    theme: 'Tema',
    sound: 'Sonido',
    voice: 'Voz',

    welcome_eyebrow: 'Campus · Edificio central',
    welcome_title: 'Elige tu destino',
    welcome_sub: 'Te guiaremos nodo a nodo con códigos QR en cada punto de referencia.',
    choose_dest: 'Destinos disponibles',
    dest_a: 'Laboratorio de Cómputo',
    dest_a_meta: 'Bloque B · Piso 2',
    dest_b: 'Biblioteca Central',
    dest_b_meta: 'Bloque A · Piso 1',
    dest_c: 'Oficina de Trámites',
    dest_c_meta: 'Bloque C · Piso 1',
    steps_min: 'nodos',
    time_min: 'min',
    nodes_min: 'nodos',

    briefing_title: 'Tu recorrido',
    briefing_sub: 'Revisa la ruta antes de empezar. Confirmarás cada nodo con un código QR.',
    start_btn: 'Comenzar recorrido',
    start: 'Iniciar',
    route_node_1: 'Salir por la puerta principal',
    route_node_2: 'Subir por las escaleras centrales',
    route_node_3: 'Girar a la derecha en el pasillo B',
    route_node_4: 'Pasar frente a los baños',
    route_node_end: 'Llegar al destino',

    navigating_to: 'Navegando hacia',
    action_continue: 'Continuar',
    action_scan: 'Escanear código QR',
    action_confirm: 'Confirmar',
    action_next: 'Siguiente',
    action_arrived: 'He llegado',
    action_reorient: 'Necesito reorientarme',
    action_restart: 'Reiniciar recorrido',
    back: 'Atrás',

    landmark_label: 'Punto de referencia',
    lm_1_name: 'Mural de bienvenida',
    lm_2_name: 'Reloj del segundo piso',
    lm_3_name: 'Letrero "Bloque B"',
    lm_4_name: 'Bebedero junto a los baños',
    lm_5_name: 'Puerta 204',

    direction_1: 'Sal por la puerta principal y camina derecho hacia el patio central.',
    direction_2: 'Sube por las escaleras centrales hasta el segundo piso.',
    direction_3: 'Gira a la derecha al final del pasillo y sigue el letrero del Bloque B.',
    direction_4: 'Camina 20 metros y pasa frente a los baños.',
    direction_5: 'La puerta 204 está a tu izquierda. ¡Ya casi llegas!',

    walk_min: 'min caminando',
    node_of: 'Nodo {current} de {total}',

    scan_title: 'Escanea el código QR',
    scan_sub: 'Apunta la cámara al código en el punto de referencia.',
    scan_hint: 'Alinea el código dentro del recuadro',
    scan_confirm_btn: 'Simular escaneo',

    confirmed_title: '¡Nodo confirmado!',
    confirmed_sub: 'Vas por el camino correcto.',
    progress_label: 'Progreso del recorrido',
    continue_btn: 'Continuar',

    recovery_title: '¿Te perdiste?',
    recovery_sub: 'No te preocupes, podemos retomar desde tu último punto confirmado.',
    recovery_body: 'Regresa al siguiente punto de referencia y confirma cuando lo encuentres.',
    last_confirmed: 'Último nodo confirmado',
    return_btn: 'Reiniciar recorrido',
    resume_btn: 'Retomar recorrido',

    arrived_title: '¡Has llegado!',
    arrived_sub: 'Llegaste a tu destino sin problemas.',
    summary: 'Resumen del recorrido',
    sum_time: 'Tiempo total',
    sum_steps: 'Nodos recorridos',
    sum_errors: 'Desvíos',
    sum_score: 'Precisión',
    arrived_action: 'Volver al inicio',

    voice_listen: 'Escuchando…',
    voice_cmd_next: 'Di "siguiente" para avanzar',
    voice_cmd_reorient: 'Di "reorientar" si te perdiste',
    toast_sound_on: 'Sonido activado',
    toast_sound_off: 'Sonido desactivado',
    toast_voice_on: 'Voz activada',
    toast_voice_off: 'Voz desactivada',
    toast_voice_unsupported: 'Voz no disponible en este dispositivo',
    toast_mic_unsupported: 'El reconocimiento de voz requiere una compilación nativa (no disponible en Expo Go)',
    toast_mic_denied: 'Permiso de micrófono denegado',
    toast_scan_ok: 'Código escaneado correctamente',
    toast_progress: 'Progreso guardado',
    toast_recovery: 'Modo de reorientación activado',
    clock: 'Hora',

    voice_welcome_script:
      'Bienvenido a MicroGuide. Elige un destino: laboratorio, biblioteca, u oficina.',
    voice_briefing_script:
      'Este es tu recorrido hacia {dest}. Tiene {nodes} nodos y toma alrededor de {min} minutos caminando. Presiona comenzar cuando estés listo.',
    voice_navigating_script:
      'Nodo {index} de {total}. {direction} Busca como referencia: {landmark}.',
    voice_scan_script: 'Apunta la cámara al código QR dentro del recuadro para confirmar tu posición.',
    voice_confirmed_script:
      'Confirmado. Vas por el camino correcto. Llevas un {pct} por ciento del recorrido.',
    voice_recovery_script:
      'No te preocupes. Tu último punto confirmado fue: {landmark}. Puedes retomar desde ahí o reiniciar el recorrido.',
    voice_arrived_script:
      'Has llegado a tu destino. Tiempo total: {min} minutos, con {errors} desvíos.',
    voice_status_listening: 'Escuchando',
    voice_status_speaking: 'Hablando',
    voice_status_idle: 'Voz activa',
    voice_mic_start: 'Activar micrófono',
    voice_mic_stop: 'Detener micrófono',
    voice_heard: 'Se escuchó: "{text}"',
    voice_not_understood: 'No entendí: "{text}"',
    voice_listening_live: 'Escuchando… {text}',
  },
  en: {
    app_name: 'MicroGuide',
    theme: 'Theme',
    sound: 'Sound',
    voice: 'Voice',

    welcome_eyebrow: 'Campus · Main building',
    welcome_title: 'Choose your destination',
    welcome_sub: "We'll guide you node by node with QR codes at each landmark.",
    choose_dest: 'Available destinations',
    dest_a: 'Computer Lab',
    dest_a_meta: 'Block B · Floor 2',
    dest_b: 'Central Library',
    dest_b_meta: 'Block A · Floor 1',
    dest_c: 'Admin Office',
    dest_c_meta: 'Block C · Floor 1',
    steps_min: 'nodes',
    time_min: 'min',
    nodes_min: 'nodes',

    briefing_title: 'Your route',
    briefing_sub: "Review the route before you start. You'll confirm each node with a QR code.",
    start_btn: 'Start route',
    start: 'Start',
    route_node_1: 'Exit through the main door',
    route_node_2: 'Go up the central staircase',
    route_node_3: 'Turn right into hallway B',
    route_node_4: 'Pass by the restrooms',
    route_node_end: 'Arrive at destination',

    navigating_to: 'Navigating to',
    action_continue: 'Continue',
    action_scan: 'Scan QR code',
    action_confirm: 'Confirm',
    action_next: 'Next',
    action_arrived: "I've arrived",
    action_reorient: 'I need to reorient',
    action_restart: 'Restart route',
    back: 'Back',

    landmark_label: 'Landmark',
    lm_1_name: 'Welcome mural',
    lm_2_name: 'Second floor clock',
    lm_3_name: '"Block B" sign',
    lm_4_name: 'Water fountain by the restrooms',
    lm_5_name: 'Door 204',

    direction_1: 'Exit through the main door and walk straight toward the central courtyard.',
    direction_2: 'Go up the central staircase to the second floor.',
    direction_3: 'Turn right at the end of the hallway and follow the Block B sign.',
    direction_4: 'Walk 20 meters and pass by the restrooms.',
    direction_5: "Door 204 is on your left. You're almost there!",

    walk_min: 'min walk',
    node_of: 'Node {current} of {total}',

    scan_title: 'Scan the QR code',
    scan_sub: 'Point the camera at the code on the landmark.',
    scan_hint: 'Align the code inside the frame',
    scan_confirm_btn: 'Simulate scan',

    confirmed_title: 'Node confirmed!',
    confirmed_sub: "You're on the right path.",
    progress_label: 'Route progress',
    continue_btn: 'Continue',

    recovery_title: 'Got lost?',
    recovery_sub: "Don't worry, we can resume from your last confirmed point.",
    recovery_body: 'Go back to the last landmark and confirm once you find it.',
    last_confirmed: 'Last confirmed node',
    return_btn: 'Restart route',
    resume_btn: 'Resume route',

    arrived_title: "You've arrived!",
    arrived_sub: 'You reached your destination without issues.',
    summary: 'Route summary',
    sum_time: 'Total time',
    sum_steps: 'Nodes completed',
    sum_errors: 'Detours',
    sum_score: 'Accuracy',
    arrived_action: 'Back to start',

    voice_listen: 'Listening…',
    voice_cmd_next: 'Say "next" to advance',
    voice_cmd_reorient: 'Say "reorient" if you got lost',
    toast_sound_on: 'Sound on',
    toast_sound_off: 'Sound off',
    toast_voice_on: 'Voice on',
    toast_voice_off: 'Voice off',
    toast_voice_unsupported: 'Voice is not available on this device',
    toast_mic_unsupported: 'Voice command recognition needs a native build (not available in Expo Go)',
    toast_mic_denied: 'Microphone permission denied',
    toast_scan_ok: 'Code scanned successfully',
    toast_progress: 'Progress saved',
    toast_recovery: 'Recovery mode activated',
    clock: 'Time',

    voice_welcome_script: 'Welcome to MicroGuide. Choose a destination: lab, library, or office.',
    voice_briefing_script:
      "This is your route to {dest}. It has {nodes} nodes and takes about {min} minutes on foot. Tap start when you're ready.",
    voice_navigating_script: 'Node {index} of {total}. {direction} Look for this landmark: {landmark}.',
    voice_scan_script: 'Point the camera at the QR code inside the frame to confirm your position.',
    voice_confirmed_script: "Confirmed. You're on the right path. You've completed {pct} percent of the route.",
    voice_recovery_script:
      'Don’t worry. Your last confirmed point was: {landmark}. You can resume from there or restart the route.',
    voice_arrived_script: "You've arrived at your destination. Total time: {min} minutes, with {errors} detours.",
    voice_status_listening: 'Listening',
    voice_status_speaking: 'Speaking',
    voice_status_idle: 'Voice active',
    voice_mic_start: 'Turn on microphone',
    voice_mic_stop: 'Turn off microphone',
    voice_heard: 'Heard: "{text}"',
    voice_not_understood: "Didn't catch that: \"{text}\"",
    voice_listening_live: 'Listening… {text}',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function translate(lang: Lang, key: TranslationKey, vars?: Record<string, string | number>): string {
  let str: string = translations[lang][key] ?? translations.es[key] ?? String(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return str;
}
