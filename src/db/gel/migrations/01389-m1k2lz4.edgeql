CREATE MIGRATION m1k2lz4ga65e3qjvjn3kpanfzmjbylraqqctpkrx54qp73irqcf23a
    ONTO m1ijzi3tkgj3so6gr6ncqjwapcuv2qevshxz6olntolugq345mmr7a
{
  ALTER TYPE sys_core::SysEligibility {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_eligibility'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
