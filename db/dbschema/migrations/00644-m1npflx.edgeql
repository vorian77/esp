CREATE MIGRATION m1npflxhqlvx6mnwp4yttpqei43hvu4lbhla6kz56wjqbkkpzq6tla
    ONTO m1vucvht34pnue6guyexzrwrfr5cjcbmnoo264vtjlmgid3wryuaja
{
  ALTER TYPE sys_core::SysCode {
      DROP LINK ownerOld;
  };
};
