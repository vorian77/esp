CREATE MIGRATION m1cpsslxh4y5sx6ails4oohtz5r5w6kevnp5hyiruw5okzrdingfuq
    ONTO m147fxb7arsop3x6aotaye2s6uunu67emndxgnscfusqfd5e65tw5q
{
  ALTER TYPE default::SysPerson {
      DROP PROPERTY websiteNew;
  };
};
