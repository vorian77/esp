CREATE MIGRATION m122wcklmnluxehrxvfmhqmhawnupmqrdmi2sjj5nod22aauyd7z4a
    ONTO m1aemdg3q6nkqc3k3wgwf3mvr2g7hogluxngkuxowhpkm75szpjfhq
{
  ALTER TYPE default::SysPerson {
      DROP PROPERTY header;
  };
};
