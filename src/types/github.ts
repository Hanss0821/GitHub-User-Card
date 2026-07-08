import { z } from "zod";
// 提前放上后续要用的类型，顺便探测 verbatimModuleSyntax
// export type GithubUser = {
//   login: string;
//   avatar_url: string;
//   bio: string | null;
//   public_repos: number;
//   followers: number;
// };
//

// 创建结构化对象
export const GithubUserSchema = z.object({
  login: z.string(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
});

export type GithubUser = z.infer<typeof GithubUserSchema>;

// 联合类型判别
// ts能知道type === success 有data是因为联合类型的做了类型的收窄
export type FetchState<T> =
  | {
      status: "idle";
    }
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      message: string;
    };
