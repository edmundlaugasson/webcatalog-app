/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  DIALOG_REFERRAL_CLOSE,
  DIALOG_REFERRAL_OPEN,
} from '../../constants/actions';

export const close = () => ({
  type: DIALOG_REFERRAL_CLOSE,
});

export const open = () => ({
  type: DIALOG_REFERRAL_OPEN,
});
