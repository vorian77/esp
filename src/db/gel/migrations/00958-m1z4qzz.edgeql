CREATE MIGRATION m1z4qzzdtyd24huiyboldyykcrxyezgi7ltddhofbd4csjdjylqoca
    ONTO m165whbpnz3tc4ulpcwsp3xq5e445w6ljhxjt7uuoutds3gfua34ca
{
  ALTER TYPE sys_core::SysNodeObjData {
      ALTER LINK codeAction {
          SET REQUIRED USING (<sys_core::SysCode>{});
          SET TYPE sys_core::SysCodeAction USING (.codeAction[IS sys_core::SysCodeAction]);
      };
  };
};
