CREATE MIGRATION m14ebvicwfhjwclfnpwffgqxxeplee6rihjpgjwduomisawowfopvq
    ONTO m13wbunawsgh2kgra2zjsmasb2qit7kp3v7f6nwwlfbgfm7fnys3fq
{
              DROP FUNCTION sys_core::getEnt(entName: std::str);
  CREATE TYPE sys_core::SysSystem EXTENDING sys_core::SysEnt;
};
