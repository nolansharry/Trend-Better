export default function SettingsOverlay() {
    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.35)",
            zIndex: -1,
        }} />
    );
}