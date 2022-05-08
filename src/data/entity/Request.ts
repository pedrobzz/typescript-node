/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from "express";
import {
  AfterInsert,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "requests" })
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  route: string;
  @Column()
  source: string;
  @Column({ type: "text", nullable: true })
  request?: Request;
  @Column({ type: "text", nullable: true })
  body?: Record<string, unknown>;
  @Column({ type: "text", nullable: true })
  params?: Record<string, unknown>;
  @Column({ type: "text", nullable: true })
  header?: Record<string, unknown>;
  @Column({ type: "text", nullable: true })
  response?: Record<string, unknown>;
  @Column({ default: "ready" })
  status?: "ready" | "success" | "error";
  @Column({ default: "ready" })
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  @Column({ default: new Date().toISOString() })
  createdAt?: string;
  @Column({ default: new Date().toISOString() })
  updatedAt?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert(): Promise<void> {
    const req = this.request;
    // @ts-ignore
    this.method = req.method;
    // @ts-ignore
    this.request = JSON.stringify({
      headers: req.headers,
      method: req.method,
      url: req.url,
      httpVersion: req.httpVersion,
      body: req.body,
      cookies: req.cookies,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      hostname: req.hostname,
      ip: req.ip,
      originalUrl: req.originalUrl,
      params: req.params,
    });
    // @ts-ignore
    this.body = JSON.stringify(this.body);
    // @ts-ignore
    this.params = JSON.stringify(this.params);
    // @ts-ignore
    this.header = JSON.stringify(this.header);
    if (this.response) {
      // @ts-ignore
      this.response = JSON.stringify(this.response);
    }
    this.updatedAt = new Date().toISOString();
  }

  @AfterInsert()
  @AfterLoad()
  async AfterInsert(): Promise<void> {
    this.request = JSON.parse(this.request as unknown as string);
    this.body = JSON.parse(this.body as unknown as string);
    this.params = JSON.parse(this.params as unknown as string);
    this.header = JSON.parse(this.header as unknown as string);
    if (this.response)
      this.response = JSON.parse(this.response as unknown as string);
  }

  getAvailableMethods(): string[] {
    return ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];
  }

  getAvailableStatus(): string[] {
    return ["ready", "success", "error"];
  }
}
