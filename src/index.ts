/**
 * Copyright (C) 2022-2023 Permanent Data Solutions, Inc. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { ArFSEntityData, arDriveFactory, readJWKFile } from 'ardrive-core-js';
import { program } from 'commander';


// massive_create_ardrive_drives --wallet "$PATH_TO_MY_WALLET" --prefix "my_prefix" --number 100

program
  .command('run')
  .description('Create ArDrive drives in mass')
  .option('-d, --dry-run', 'Dry run')
  .requiredOption('-w, --wallet <path>', 'Path to wallet file')
  .requiredOption('-p, --prefix <prefix>', 'Prefix for the drive names')
  .requiredOption('-n, --number <number>', 'Number of drives to create')
  .action(async (options) => {
    const walletPath = options.wallet;
    const prefix = options.prefix;
    const number = parseInt(options.number);
    const dryRun = options.dryRun;

    Headers;

    console.log('Creating ArDrive drives... ');

    // Read wallet from file
    const myWallet = readJWKFile(walletPath);

    // Construct ArDrive class
    const arDrive = arDriveFactory({ wallet: myWallet, dryRun });

    const createdDrives: Array<ArFSEntityData> = [];

    for (let i = 0; i < number; i++) {
      // Create a public drive and its root folder
      const createDriveResult = await arDrive.createPublicDrive({
        driveName: `${prefix}-${i}`,
        
      });

      createdDrives.push(...createDriveResult.created);
    }

    console.log(createdDrives);
  });

program.parse();