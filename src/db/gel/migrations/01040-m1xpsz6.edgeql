CREATE MIGRATION m1xpsz6fuxsg4iikc47qwxj2g2uutujrhdsd5hvke7cb7guhcbmyla
    ONTO m1n5y23r5psqxf5afomziqikmai6x5cvdrazf7b3pxaj35dhstpl7a
{
  ALTER TYPE sys_core::SysMsg {
      DROP LINK codeStatus;
  };
  ALTER TYPE sys_core::SysMsg {
      CREATE PROPERTY isRequestResponse: std::bool;
  };
};
