CREATE MIGRATION m16qircuazsbcchjckgjdyogy4jivvkh4a5po7fibhu5rhsmmmmkca
    ONTO m1sok3org5amsmeg2ngpcpfoeqog7acpkht3lprn52spfao3qrth4q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK customColNodeComponent: sys_core::SysCode;
  };
};
