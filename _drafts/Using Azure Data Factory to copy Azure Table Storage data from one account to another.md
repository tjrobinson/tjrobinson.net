# Using Azure Data Factory to copy Azure Table Storage data from one account to another

There's currently no way of easily Azure Table Storage data from one account to another, for example from an account in one region, to another.

Some of the options are:

* PowerShell
* Azure Data Factory

I will be covering the use of Azure Data Factory.

Watch out for skipped rows, if your mappings don't match the data. For example: `UserErrorInvalidDataValue` - `Column 'EntityId' contains an invalid value '8726681e-0ac6-42a0-aa9d-37fe30491e46'.`
