import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const imgBuffer = await readFile(join(process.cwd(), 'public/hero_img.png'));
  const imgSrc = `data:image/png;base64,${imgBuffer.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: '60px',
        gap: '60px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        width={280}
        height={280}
        alt=""
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Oliver James Aco
        </span>
        <span
          style={{
            fontSize: 30,
            color: '#94a3b8',
          }}
        >
          Web Developer &amp; Frontend Specialist
        </span>
        <span
          style={{
            fontSize: 22,
            color: '#475569',
            marginTop: '8px',
          }}
        >
          ojaco.dev
        </span>
      </div>
    </div>,
    { ...size },
  );
}
