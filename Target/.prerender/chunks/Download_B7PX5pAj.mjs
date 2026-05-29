import { a as GetWorkersClient } from './Base_C_b_uBI-.mjs';

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
  /**
   * Returns all previous release versions, ordered newest-first.
   * Semantic alias for GetVersionList() with an explicit limit default.
   */
  async GetPreviousReleases(Limit = 20) {
    return await this.GetVersionList(Limit);
  }
  /**
   * Returns the latest release for the given platform and architecture.
   * Semantic alias for GetLatest() with named parameters.
   */
  async GetLatestRelease(Platform, Architecture) {
    return await this.GetLatest(Platform, Architecture);
  }
  /**
   * Returns the direct download URL for the given platform and architecture.
   * Fetches the latest release, then resolves the download info URL.
   */
  async GetDownloadUrl(Platform, Architecture) {
    const Latest = await this.GetLatest(Platform, Architecture);
    const Info = await this.GetInfo(Latest.id);
    return Info.downloadUrl;
  }
}
const Download = new DownloadsAPI();

export { DownloadsAPI, Download as default };
