import { ImageType } from '@jellyfin/sdk/lib/generated-client';
import React, { FC, useCallback } from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

import globalize from 'scripts/globalize';
import { LibraryViewSettings, ViewMode } from 'types/library';
import { LibraryTab } from 'types/libraryTab';

const imageTypesOptions = [
    { label: 'Primary', value: ImageType.Primary },
    { label: 'Banner', value: ImageType.Banner },
    { label: 'Disc', value: ImageType.Disc },
    { label: 'Logo', value: ImageType.Logo },
    { label: 'Thumb', value: ImageType.Thumb }
];

interface ViewSettingsButtonProps {
    viewType: LibraryTab;
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<React.SetStateAction<LibraryViewSettings>>;
}

const ViewSettingsButton: FC<ViewSettingsButtonProps> = ({
    viewType,
    libraryViewSettings,
    setLibraryViewSettings
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'selectview-popover' : undefined;

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.name;

            setLibraryViewSettings((prevState) => ({
                ...prevState,
                [name]: event.target.checked
            }));
        },
        [setLibraryViewSettings]
    );

    const onSelectChange = useCallback(
        (event: SelectChangeEvent) => {
            setLibraryViewSettings((prevState) => ({
                ...prevState,
                ImageType: event.target.value as ImageType
            }));
        },
        [setLibraryViewSettings]
    );

    const getVisibleImageType = () => {
        const visibleImageType: ImageType[] = [ImageType.Primary];

        if (
            viewType !== LibraryTab.Episodes
            && viewType !== LibraryTab.Artists
            && viewType !== LibraryTab.AlbumArtists
            && viewType !== LibraryTab.Albums
        ) {
            visibleImageType.push(ImageType.Banner);
            visibleImageType.push(ImageType.Disc);
            visibleImageType.push(ImageType.Logo);
            visibleImageType.push(ImageType.Thumb);
        }

        return visibleImageType;
    };

    const isViewSettingsEnabled = () => {
        return libraryViewSettings.ViewMode !== ViewMode.ListView;
    };

    return (
        <Box>
            <IconButton
                title={globalize.translate('ButtonSelectView')}
                sx={{ ml: 2 }}
                aria-describedby={id}
                className='paper-icon-button-light btnShuffle autoSize'
                onClick={handleClick}
            >
                <ViewComfyIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                sx={{
                    '& .MuiFormControl-root': { m: 1, width: 220 }
                }}
            >
                <FormControl>
                    <InputLabel id='select-sort-label'>
                        <Typography component='span'>
                            {globalize.translate('LabelImageType')}
                        </Typography>
                    </InputLabel>
                    <Select
                        value={libraryViewSettings.ImageType}
                        label={globalize.translate('LabelImageType')}
                        onChange={onSelectChange}
                    >
                        {imageTypesOptions
                            .filter((imageType) => getVisibleImageType().includes(imageType.value))
                            .map((imageType) => (
                                <MenuItem
                                    key={imageType.value}
                                    value={imageType.value}
                                >
                                    <Typography component='span'>
                                        {globalize.translate(imageType.label)}
                                    </Typography>
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                {isViewSettingsEnabled() && (
                    <>
                        <Divider />
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={libraryViewSettings.ShowTitle}
                                            onChange={handleChange}
                                            name='ShowTitle'
                                        />
                                    }
                                    label={globalize.translate('ShowTitle')}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={libraryViewSettings.ShowYear}
                                            onChange={handleChange}
                                            name='ShowYear'
                                        />
                                    }
                                    label={globalize.translate('ShowYear')}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                libraryViewSettings.CardLayout
                                            }
                                            onChange={handleChange}
                                            name='CardLayout'
                                        />
                                    }
                                    label={globalize.translate(
                                        'EnableCardLayout'
                                    )}
                                />
                            </FormGroup>
                        </FormControl>
                    </>
                )}
            </Popover>
        </Box>
    );
};

export default ViewSettingsButton;
