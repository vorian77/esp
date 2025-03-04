CREATE MIGRATION m1yokmfoimkwjqqtpb7ktr2nifvzlu5zevwj62zuj3v2idzbhwy5ua
    ONTO m15zuzsywgismgazp56vth4hg6hxpsbvk7mxtij4igl4ivhm4vshlq
{
              ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK codeElement: sys_core::SysCode;
  };
};
