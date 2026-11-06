export interface BitChordAuthOptions {
  hosts: string[];
  issuer?: string;
  jwksUrl?: string;
  maxProofAgeSeconds?: number;
  clockSkewSeconds?: number;
  fetch?: typeof fetch;
  now?: () => number;
}

export type BitChordAuthResult =
  | {
      ok: true;
      claims: {
        sub: string;
        ver: number;
        exp: number;
        sl: string;
      };
    }
  | {
      ok: false;
      status: number;
      error: string;
      message: string;
    };

export function createBitChordAuth(options: BitChordAuthOptions): {
  verify(input: {
    token?: string;
    proof?: string;
  }): Promise<BitChordAuthResult>;

  verifyRequest(req: { headers: any }): Promise<BitChordAuthResult>;

  rejection(result: Extract<BitChordAuthResult, { ok: false }>): {
    status: number;
    headers: Record<string, string>;
    body: string;
  };

  express(): any;

  guard(request: Request): Promise<Response | null>;
};

export const BITCHORD_AUTH_ISSUER: string;
export const BITCHORD_AUTH_AUDIENCE: string;
export const TOKEN_HEADER: string;
export const PROOF_HEADER: string;
