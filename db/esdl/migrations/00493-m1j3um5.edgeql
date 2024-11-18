CREATE MIGRATION m1j3um55v3rj6774u3iwhoinbshzoa7gnmqkjne6sebet7aypkocua
    ONTO m1c6iygxu42thqrugrlqgm2wojljjkyvpdafnnlqf5mhnidumnyxia
{
  ALTER TYPE sys_rep::SysRepUserEl {
      CREATE PROPERTY orderDisplay: default::nonNegative;
  };
};
