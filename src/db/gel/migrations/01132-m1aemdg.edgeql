CREATE MIGRATION m1aemdg3q6nkqc3k3wgwf3mvr2g7hogluxngkuxowhpkm75szpjfhq
    ONTO m15ifc4ch3v4zaugg2yyj3ha7qdjbfmcitcyf3lxsjlrh7hfipgm2q
{
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY header := (((.firstName ++ ' ') ++ .lastName));
  };
};
