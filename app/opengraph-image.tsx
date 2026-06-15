import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";

export const alt = "Lotus Impex";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0b",
          color: "#f4efe7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "999px",
              background: "#f4efe7",
              color: "#0b0b0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 900,
            }}
          >
            LI
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "42px",
                fontWeight: 900,
                letterSpacing: "-2px",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "18px",
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: "rgba(244,239,231,0.62)",
              }}
            >
              Export House
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "112px",
              lineHeight: "0.85",
              fontWeight: 900,
              letterSpacing: "-7px",
              textTransform: "uppercase",
              maxWidth: "920px",
            }}
          >
            Exports Built For Global Trade
          </div>

          <div
            style={{
              marginTop: "28px",
              fontSize: "28px",
              color: "rgba(244,239,231,0.68)",
            }}
          >
            Garments • Fabrics • Accessories • Machinery • General Goods
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}