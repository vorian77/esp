CREATE MIGRATION m1pdndk2jl37pxeriu7ufbrr7bt7dcc7avh6mnqgpfu6s33nm5hp7q
    ONTO m13yi7sytqpswghnaz55yll6c4omhucifxcvxbzyvwwyl6yzbdvg5a
{
  ALTER TYPE org_moed::MoedPPartData RENAME TO org_moed::MoedPartData;
  ALTER TYPE org_moed::MoedPPartDoc RENAME TO org_moed::MoedPartDoc;
  ALTER TYPE org_moed::MoedPPartNote RENAME TO org_moed::MoedPartNote;
};
