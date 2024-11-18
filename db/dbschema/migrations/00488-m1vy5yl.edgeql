CREATE MIGRATION m1vy5ylnwsshl4jemnre6vhuhxj6rqlfhhxiedjk7c26ohfmtqihxq
    ONTO m1spa6nkjurfhnjxlc5wxdds2xfwsyoukdva43gvcmt4kmrer6ej3q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK withs;
  };
};
