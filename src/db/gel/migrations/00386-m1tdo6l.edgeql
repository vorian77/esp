CREATE MIGRATION m1tdo6lds35d4poodmvlqiggolbwdzeeu2lce36tr4tbyjfrkquqma
    ONTO m1bafc76jcxpeoitlc4qt57dhdagipnpnkuzsuaaxwi3ehz3ter6aa
{
                  ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK codeAlignment: sys_core::SysCode;
  };
};
