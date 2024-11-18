CREATE MIGRATION m1hnpfqohkbgajg4sxiueh5usf474h457daldammlnxdks3dxtzuba
    ONTO m1yokmfoimkwjqqtpb7ktr2nifvzlu5zevwj62zuj3v2idzbhwy5ua
{
  ALTER TYPE sys_rep::SysRepUser {
      CREATE MULTI LINK analytics: sys_rep::SysRepUserAnalytic {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
