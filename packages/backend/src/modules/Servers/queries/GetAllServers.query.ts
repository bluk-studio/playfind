import { Context } from "packages/backend/src/context";
import { IServer } from "../types";

export async function GetAllServers(ctx: Context): Promise<Array<IServer>> {
  return [
    {
      id: "test-id",
      name: "Тестовый сервер №1",
      description: "vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit",
      tags: ["Test 2", "Test 3", "Test 6"],
      logotype: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: "test-id-2",
      name: "Тестовый сервер №2",
      description: "vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit",
      tags: ["Test 1"],
      logotype: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: "test-id-3",
      name: "Тестовый сервер №3",
      description: "vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit",
      tags: ["Test 4", "Test 5"],
      logotype: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
    }
  ]
};