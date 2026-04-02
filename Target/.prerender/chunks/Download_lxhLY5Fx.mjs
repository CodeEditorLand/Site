import { b as GetWorkersClient } from './Base_Czy5kkbA.mjs';

class DownloadsAPI {
  Workers = GetWorkersClient();
  async GetBinaries(Platform, Architecture) {
    const Response = await this.Workers.Download.GetBinaries(
      Platform,
      Architecture
    );
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch binaries");
    }
    return Response.data;
  }
  async GetVersionList(Limit) {
    const Response = await this.Workers.Download.GetVersionList(Limit);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch version list");
    }
    return Response.data;
  }
  async GetDownload(Identifier) {
    const Response = await this.Workers.Download.GetDownload(Identifier);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch download");
    }
    return Response.data;
  }
  async GetSHA256(Identifier) {
    const Response = await this.Workers.Download.GetSHA256(Identifier);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch checksum");
    }
    return Response.data;
  }
  async GetSignature(Identifier) {
    const Response = await this.Workers.Download.GetSignature(Identifier);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch signature");
    }
    return Response.data;
  }
  async GetInfo(Identifier) {
    const Response = await this.Workers.Download.GetInfo(Identifier);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch download info");
    }
    return Response.data;
  }
  async GetByVersion(Version, Platform, Architecture) {
    const Response = await this.Workers.Download.GetByVersion(
      Version,
      Platform,
      Architecture
    );
    if (!Response.success || !Response.data) {
      throw new Error(
        Response.error || "Failed to fetch downloads by version"
      );
    }
    return Response.data;
  }
  async GetLatest(Platform, Architecture) {
    const Response = await this.Workers.Download.GetLatest(
      Platform,
      Architecture
    );
    if (!Response.success || !Response.data) {
      throw new Error(
        Response.error || "Failed to fetch latest download"
      );
    }
    return Response.data;
  }
  async TrackDownload(Identifier) {
    const Response = await this.Workers.Download.TrackDownload(Identifier);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to track download");
    }
    return Response.data;
  }
  async GetAnalytics(Limit, Offset) {
    const Response = await this.Workers.Download.GetAnalytics(
      Limit,
      Offset
    );
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to fetch analytics");
    }
    return Response.data;
  }
}
const Download = new DownloadsAPI();

export { DownloadsAPI, Download as default };
