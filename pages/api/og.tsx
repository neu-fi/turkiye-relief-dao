import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <img
          width={1200}
          height={1200}
          src={'https://turkey-relief-dao.vercel.app/background.jpeg'}
          style={{
            borderRadius: 128,
          }}
        />
        <div 
        // tw="text-5xl font-bold tracking-tight text-gray-200"
        style={{
          display: 'flex',
          color: '#f6f6f6',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '100',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>Türkiye Relief DAO</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
