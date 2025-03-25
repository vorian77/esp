CREATE MIGRATION m1fm5wrbgvq5o3bwa3egb4opsu44a23ax36nc72uui2dph5llseedq
    ONTO m1xpsz6fuxsg4iikc47qwxj2g2uutujrhdsd5hvke7cb7guhcbmyla
{
  ALTER TYPE default::SysPerson {
      CREATE LINK codePersonLivingArrangements: sys_core::SysCode;
  };
};
