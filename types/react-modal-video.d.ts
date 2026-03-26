declare module 'react-modal-video' {
    import * as React from "react";

    export interface VimeoApi {
        api?: boolean;
        autopause?: boolean;
        autoplay?: boolean;
        byline?: boolean;
        callback?: string;
        color?: string;
        height?: number;
        loop?: boolean;
        maxheight?: number;
        maxwidth?: number;
        player_id?: string;
        portrait?: boolean;
        title?: boolean;
        width?: boolean;
        xhtml?: true;
        [key: string]: any;
    }
    export interface YoutubeApi {
        autoplay?: 0 | 1;
        cc_load_policy?: 0 | 1;
        color?: "red | white";
        controls?: 0 | 1;
        disablekb?: 0 | 1;
        enablejsapi?: 0 | 1;
        end?: number;
        fs?: 0 | 1;
        h1?: string;
        iv_load_policy?: 0 | 1;
        list?: string;
        listType?: "playlist" | "user_uploads";
        loop?: 0 | 1;
        modestbranding?: 0 | 1;
        origin?: string;
        playlist?: `${string},${string}`;
        playsinline?: 0 | 1;
        rel?: 0 | 1;
        showinfo?: 0 | 1;
        start?: 0 | 1;
        wmode?: string;
        theme?: string;
        mute?: 0 | 1;
        [key: string]: any;
    }
    export interface YoukuApi {
        autoplay?: 1 | 0;
        show_related?: 1 | 0;
        [key: string]: any;
    }

    export interface Vendor {
        /**
         * @default "youtube"
         */
        channel?: string;
        videoId: string;
    }
    export interface Youku extends Vendor {
        channel: "youku";
        youku?: YoukuApi;
    }
    export interface Youtube extends Vendor {
        channel: "youtube";
        /**
         * @link https://developers.google.com/youtube/player_parameters
         */
        youtube?: YoutubeApi;
    }
    export interface Vimeo extends Vendor {
        channel: "vimeo";
        /**
         * @link https://developer.vimeo.com/api/oembed/videos
         */
        vimeo?: VimeoApi;
    }
    export interface Custom {
        channel: "custom";
        url: string;
    }

    export interface ClassNames {
        modalVideoEffect: string;
        modalVideo: string;
        modalVideoClose: string;
        modalVideoBody: string;
        modalVideoInner: string;
        modalVideoIframeWrap: string;
        modalVideoCloseBtn: string;
    }
    export interface Aria {
        openMessage: string;
        dismissBtnMessage: string;
    }
    export interface ModalVideoBaseProps {
        /**
         * @default false
         */
        isOpen: boolean;
        onClose?: () => void;
        /**
         * @default true
         */
        allowFullScreen?: boolean;
        /**
         * @default '16:9'
         */
        ratio?: string;
        /**
         * @default 300
         */
        animationSpeed?: number;

        classNames?: Partial<ClassNames>;

        aria?: Partial<Aria>;
    }

    export type ModalVideoProps = ModalVideoBaseProps & (Youtube | Vimeo | Youku | Custom);

    export default class ModalVideo extends React.Component<ModalVideoProps> {
    }
}
