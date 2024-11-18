CREATE MIGRATION m1gwqitzwvkvzkzg7vnsvm474law5ijzs62kedozw77iwgwvta6uea
    ONTO m176vxq2kyb52azbrzxjtpd6zfi5adalsyyob6pgozwrqm36cf5tfa
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isSystemRootNode {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
