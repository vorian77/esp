CREATE MIGRATION m12uc42dpbxrxunj7ofdwhmnzpakc7t5zsg6iig73moph2h5wwdbrq
    ONTO m1v4rzalpaf3s2gwdpd3725xlmsulhoaahmeimwwzhq4qqmda56fdq
{
              CREATE FUNCTION sys_core::getApp(name: std::str) -> OPTIONAL sys_core::SysApp USING (SELECT
      std::assert_single((SELECT
          sys_core::SysApp
      FILTER
          (.name = name)
      ))
  );
};
