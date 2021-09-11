import { assertEquals } from "../deps_test.ts";
import { decode, encode } from "./utils.ts";

Deno.test("encode does nothing on alphabet characters", () => {
  const src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const dst = encode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test("encode does nothing on numeric characters", () => {
  const src = "1234567890";
  const dst = encode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test('encode encodes some symbol characters ("<>|?*)', () => {
  const src = " !\"#$%&'()*+,-./:;<=>?@[\\]^`{|}~";
  const dst = encode(src);
  const exp = " !%22#$%&'()%2a+,-./:;%3c=%3e%3f@[\\]^`{%7c}~";
  assertEquals(dst, exp);
});
Deno.test("encode does nothing on 日本語", () => {
  const src = "いろはにへへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす";
  const dst = encode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test("encode does nothing on emoji (🥃)", () => {
  const src = "🥃";
  const dst = encode(src);
  const exp = src;
  assertEquals(dst, exp);
});

Deno.test("decode does nothing on alphabet characters", () => {
  const src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const dst = decode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test("decode does nothing on numeric characters", () => {
  const src = "1234567890";
  const dst = decode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test('decode decodes encoded characters ("<>|?*)', () => {
  const src = " !%22#$%&'()%2a+,-./:;%3c=%3e%3f@[\\]^`{%7c}~";
  const dst = decode(src);
  const exp = " !\"#$%&'()*+,-./:;<=>?@[\\]^`{|}~";
  assertEquals(dst, exp);
});
Deno.test("decode does nothing on 日本語", () => {
  const src = "いろはにへへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす";
  const dst = decode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test("decode does nothing on emoji (🥃)", () => {
  const src = "🥃";
  const dst = decode(src);
  const exp = src;
  assertEquals(dst, exp);
});
Deno.test("decode decodes encoded 日本語", () => {
  const src = encodeURIComponent(
    "いろはにへへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす",
  );
  const dst = decode(src);
  const exp = "いろはにへへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす";
  assertEquals(dst, exp);
});
Deno.test("decode decodes encoded emoji (🥃)", () => {
  const src = encodeURIComponent("🥃");
  const dst = decode(src);
  const exp = "🥃";
  assertEquals(dst, exp);
});
