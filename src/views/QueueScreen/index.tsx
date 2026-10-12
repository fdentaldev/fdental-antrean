'use client'

import type { ReactNode, SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { QueueData, QueueDoctor, QueueVideo as QueueVideoConfig } from '@/types/queue'

const colors = {
  ink: '#2d1b45',
  inkSoft: '#6d5a80',
  plum: '#6941a5',
  plumDeep: '#4c287c',
  lavender: '#f2edfa',
  lavenderDeep: '#e7ddf5',
  line: '#e4d9ef',
  paper: '#ffffff',
  canvas: '#fbfaff',
  gold: '#ad6b13',
  goldSoft: '#fff4df',
  green: '#237a55',
  greenSoft: '#e9f7ef'
} as const

type Props = {
  data: QueueData
}

type BadgeProps = {
  children: ReactNode
  tone?: 'purple' | 'gold' | 'green'
}

const Badge = ({ children, tone = 'purple' }: BadgeProps) => {
  const styles = {
    purple: { color: colors.plumDeep, background: colors.lavender },
    gold: { color: colors.gold, background: colors.goldSoft },
    green: { color: colors.green, background: colors.greenSoft }
  }

  return (
    <Box
      component='span'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 30,
        height: 30,
        px: 1,
        borderRadius: 2,
        fontSize: '0.75rem',
        fontWeight: 900,
        ...styles[tone]
      }}
    >
      {children}
    </Box>
  )
}

const Surface = ({ children, sx = {} }: { children: ReactNode; sx?: object }) => (
  <Paper
    elevation={0}
    sx={{
      border: `1px solid ${colors.line}`,
      borderRadius: 4,
      background: colors.paper,
      boxShadow: '0 12px 35px rgba(77, 42, 112, 0.07)',
      ...sx
    }}
  >
    {children}
  </Paper>
)

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <Stack gap={0.35} mb={2}>
    <Typography variant='overline' sx={{ color: colors.plum, fontWeight: 900, letterSpacing: 1.5, lineHeight: 1.2 }}>
      {eyebrow}
    </Typography>
    <Typography component='h2' sx={{ color: colors.ink, fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 900 }}>
      {title}
    </Typography>
  </Stack>
)

const DoctorServingCard = ({ doctor, index }: { doctor: QueueDoctor; index: number }) => {
  const serving = doctor.nowServing
  const accent = index % 2 === 0 ? colors.plum : colors.plumDeep

  return (
    <Surface sx={{ position: 'relative', overflow: 'hidden', minHeight: { xs: 220, md: 250 } }}>
      <Box sx={{ height: 6, background: `linear-gradient(90deg, ${accent}, #a78bca)` }} />
      <Box sx={{ p: { xs: 1.75, md: 2.25 } }}>
        <Stack direction='row' alignItems='flex-start' justifyContent='space-between' gap={2}>
          <Stack direction='row' alignItems='center' gap={1.5} minWidth={0}>
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 3,
                color: '#fff',
                background: accent,
                fontSize: '1.05rem',
                fontWeight: 900
              }}
              aria-hidden='true'
            >
              {index + 1}
            </Box>
            <Box minWidth={0}>
              <Typography
                noWrap
                sx={{ color: colors.ink, fontSize: { xs: '0.95rem', md: '1.05rem' }, fontWeight: 900 }}
              >
                {doctor.name}
              </Typography>
            </Box>
            <Box
              aria-label={serving ? 'Sedang melayani' : 'Belum tersedia'}
              sx={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: '50%',
                background: serving ? '#3aa56f' : '#b9afc4',
                boxShadow: serving ? '0 0 0 5px rgba(58, 165, 111, 0.16)' : 'none',
                animation: serving ? 'queuePulse 1.8s ease-in-out infinite' : 'none',
                '@keyframes queuePulse': {
                  '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.35)', opacity: 0.55 }
                }
              }}
            />
          </Stack>
        </Stack>

        <Box sx={{ mt: 1.75, textAlign: 'center' }}>
          {serving ? (
            <>
              <Typography
                sx={{
                  color: colors.inkSoft,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase'
                }}
              >
                Nomor saat ini
              </Typography>
              <Typography
                component='div'
                sx={{
                  color: colors.plumDeep,
                  fontSize: { xs: '3.5rem', md: '4.3rem' },
                  fontWeight: 950,
                  letterSpacing: -2,
                  lineHeight: 0.95
                }}
              >
                {serving.queueNumber}
              </Typography>
              <Stack
                alignItems='center'
                mt={1.5}
                sx={{
                  minWidth: 0,
                  px: 1.25,
                  py: 1,
                  borderRadius: 2.5,
                  background: colors.lavender,
                  textAlign: 'center'
                }}
              >
                <Typography
                  noWrap
                  title={serving.patient.fullName}
                  sx={{ maxWidth: '100%', overflow: 'hidden', color: colors.ink, fontSize: { xs: '0.9rem', md: '0.98rem' }, fontWeight: 900, textOverflow: 'ellipsis' }}
                >
                  {serving.patient.fullName}
                </Typography>
                <Typography sx={{ mt: 0.35, color: colors.inkSoft, fontSize: '0.72rem', fontWeight: 800, letterSpacing: 0.35 }}>
                  RM {serving.patient.newMedRecNumber}
                </Typography>
              </Stack>
            </>
          ) : (
            <Box sx={{ py: 4 }}>
              <Typography sx={{ color: colors.lavenderDeep, fontSize: '4rem', fontWeight: 300, lineHeight: 1 }}>
                —
              </Typography>
              <Typography sx={{ mt: 1.5, color: colors.inkSoft, fontWeight: 750 }}>
                Belum ada pasien yang dipanggil
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Surface>
  )
}

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    let videoId = parsedUrl.searchParams.get('v')

    if (!videoId && parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1)
    }

    if (!videoId && parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2]
    }

    return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : null
  } catch {
    return null
  }
}

const QueueVideo = ({ video }: { video?: QueueVideoConfig }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 })
  const lastIndexRef = useRef<number | null>(null)

  const internalUrls =
    video?.type === 'internal' ? (video.urls?.length ? video.urls : video.url ? [video.url] : []) : []

  const currentUrl = internalUrls[currentIndex] || internalUrls[0]
  const embedUrl = video?.type === 'youtube' ? getYoutubeEmbedUrl(video.url) : null

  useEffect(() => {
    setCurrentIndex(0)
    lastIndexRef.current = null
  }, [video])

  useEffect(() => {
    const element = videoRef.current

    if (!element || !currentUrl) return

    element.load()
    void element.play().catch(() => undefined)
  }, [currentUrl])

  const handleVideoEnded = () => {
    setProgress({ currentTime: 0, duration: 0 })

    if (internalUrls.length <= 1) return

    setCurrentIndex(() => {
      const availableIndexes = internalUrls.map((_, index) => index).filter(index => index !== currentIndex)
      const nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]

      lastIndexRef.current = nextIndex

      return nextIndex
    })
  }

  const handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    setProgress({ currentTime: event.currentTarget.currentTime, duration: event.currentTarget.duration || 0 })
  }

  const formatDuration = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '00:00'

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const progressPercent = progress.duration ? (progress.currentTime / progress.duration) * 100 : 0

  return (
    <Surface
      sx={{
        overflow: 'hidden',
        position: 'sticky',
        top: 24,
        maxWidth: { lg: 'none' },
        justifySelf: 'stretch',
        boxShadow: '0 18px 45px rgba(77, 42, 112, 0.12)'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 260, sm: 340, lg: 0 },
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          background: colors.lavenderDeep
        }}
      >
        {video?.type === 'internal' && currentUrl ? (
          <Box
            ref={videoRef}
            component='video'
            src={currentUrl}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onLoadedMetadata={handleTimeUpdate}
            onTimeUpdate={handleTimeUpdate}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : embedUrl ? (
          <Box
            component='iframe'
            src={embedUrl}
            title='Video informasi klinik'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            referrerPolicy='strict-origin-when-cross-origin'
            sx={{ display: 'block', width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <Stack
            alignItems='center'
            justifyContent='center'
            gap={1}
            sx={{ height: '100%', px: 3, textAlign: 'center' }}
          >
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 52,
                height: 52,
                borderRadius: '50%',
                color: colors.plum,
                background: colors.paper,
                fontSize: '1.5rem',
                fontWeight: 900
              }}
              aria-hidden='true'
            >
              ▶
            </Box>
            <Typography sx={{ color: colors.plumDeep, fontWeight: 850 }}>Video informasi klinik</Typography>
            <Typography sx={{ color: colors.inkSoft, fontSize: '0.8rem' }}>
              Konten video akan tampil di area ini.
            </Typography>
          </Stack>
        )}
        {video?.type === 'internal' && currentUrl && (
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              left: 12,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              background: 'rgba(45, 27, 69, 0.28)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Box sx={{ height: 4, overflow: 'hidden', borderRadius: 2, background: 'rgba(255, 255, 255, 0.2)' }}>
              <Box
                sx={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.78)',
                  transition: 'width 120ms linear'
                }}
              />
            </Box>
            <Stack direction='row' justifyContent='space-between' mt={0.75}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.7rem', fontWeight: 700 }}>
                {formatDuration(progress.currentTime)}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.62)', fontSize: '0.7rem', fontWeight: 700 }}>
                {formatDuration(progress.duration)}
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Surface>
  )
}

const QueueRow = ({ item }: { item: QueueData['queue'][number] }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '56px minmax(0, 1fr)', md: '76px minmax(0, 1fr) minmax(170px, 200px)' },
      width: '100%',
      minWidth: 0,
      alignItems: 'center',
      gap: { xs: 1.5, md: 2 },
      px: { xs: 2, md: 2.25 },
      py: { xs: 1.5, md: 1.6 },
      borderBottom: `1px solid ${colors.line}`,
      transition: 'background 160ms ease',
      '&:last-child': { borderBottom: 0 },
      '&:hover': { background: '#fcfaff' }
    }}
  >
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minWidth: 0,
        width: '100%',
        height: 36,
        borderRadius: 1.75,
        color: colors.plumDeep,
        background: colors.lavender,
        fontSize: { xs: '1rem', md: '1.12rem' },
        fontWeight: 950,
        letterSpacing: -0.4
      }}
    >
      {item.queueNumber}
    </Box>
    <Box minWidth={0}>
      <Typography noWrap sx={{ overflow: 'hidden', color: colors.ink, fontSize: { xs: '0.86rem', md: '0.92rem' }, fontWeight: 850, textOverflow: 'ellipsis' }}>
        {item.patient.fullName}
      </Typography>
      <Typography noWrap sx={{ mt: 0.35, overflow: 'hidden', color: colors.inkSoft, fontSize: '0.7rem', fontWeight: 700, textOverflow: 'ellipsis' }}>
        RM {item.patient.newMedRecNumber}
      </Typography>
    </Box>
    <Stack
      direction='row'
      alignItems='center'
      gap={0.85}
      sx={{ gridColumn: { xs: '2 / -1', md: 'auto' }, minWidth: 0 }}
    >
      <Box
        component='span'
        aria-hidden='true'
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: 22,
          height: 22,
          flexShrink: 0,
          border: `1px solid ${colors.lavenderDeep}`,
          borderRadius: '50%',
          color: colors.plum,
          background: colors.lavender,
          fontSize: '0.82rem',
          fontWeight: 950,
          lineHeight: 1
        }}
      >
        ✚
      </Box>
      <Typography
        title={item.attendingDoctor.name}
        sx={{
          minWidth: 0,
          display: '-webkit-box',
          overflow: 'hidden',
          color: colors.plumDeep,
          fontSize: { xs: '0.78rem', md: '0.86rem' },
          fontWeight: 850,
          lineHeight: 1.25,
          textOverflow: 'ellipsis',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }}
      >
        {item.attendingDoctor.name.replace('drg. ', '')}
      </Typography>
    </Stack>
  </Box>
)

const QueueScreen = ({ data }: Props) => {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)

    return () => window.clearInterval(timer)
  }, [])

  const formattedServerTime = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
    timeZoneName: 'short',
    hourCycle: 'h23'
  }).format(currentTime)

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: `radial-gradient(circle at 92% 0%, rgba(112, 70, 170, 0.1), transparent 28%), ${colors.canvas}`,
        color: colors.ink
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1720, mx: 'auto', px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 2, md: 4 } }}>
        <Surface sx={{ px: { xs: 2, md: 3 }, py: 1.5, mb: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent='space-between'
            gap={1.5}
          >
            <Stack direction='row' alignItems='center' gap={1.5}>
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 2.25,
                  color: '#fff',
                  background: colors.plum,
                  fontSize: '1.25rem',
                  fontWeight: 900
                }}
                aria-hidden='true'
              >
                +
              </Box>
              <Box>
                <Typography sx={{ color: colors.ink, fontSize: '0.95rem', fontWeight: 900 }}>
                  {data.branch.branchName}
                </Typography>
                <Typography sx={{ color: colors.inkSoft, fontSize: '0.75rem' }}>
                  Informasi antrean dan jadwal layanan klinik
                </Typography>
              </Box>
            </Stack>
            <Stack direction='row' alignItems='center' gap={{ xs: 1.5, md: 3 }} flexWrap='wrap'>
              <Stack direction='row' alignItems='center' gap={0.8}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#3aa56f',
                    boxShadow: '0 0 0 4px #e9f7ef',
                    animation: 'queuePulse 1.8s ease-in-out infinite',
                    '@keyframes queuePulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                      '50%': { transform: 'scale(1.45)', opacity: 0.55 }
                    }
                  }}
                />
                <Typography sx={{ color: colors.green, fontSize: '0.8rem', fontWeight: 800 }}>Layanan aktif</Typography>
              </Stack>
              <Typography sx={{ color: colors.inkSoft, fontSize: '0.8rem', fontWeight: 700 }}>
                {formattedServerTime}
              </Typography>
              <Badge tone='gold'>{data.waitingCount} menunggu</Badge>
            </Stack>
          </Stack>
        </Surface>

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', lg: 'flex-end' }}
          gap={2}
          mb={{ xs: 3, md: 4 }}
        >
          <Box>
            <Typography
              sx={{
                color: colors.plum,
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: 1.8,
                textTransform: 'uppercase'
              }}
            >
              Selamat datang
            </Typography>
            <Typography
              component='h1'
              sx={{
                mt: 0.4,
                color: colors.ink,
                fontSize: { xs: '2rem', md: '3.15rem' },
                fontWeight: 950,
                letterSpacing: -1.2,
                lineHeight: 1.05
              }}
            >
              Informasi Antrean Layanan
            </Typography>
            <Typography sx={{ mt: 1, color: colors.inkSoft, fontSize: { xs: '0.9rem', md: '1rem' } }}>
              {data.branch.branchTitle} · {data.branch.branchAddressLine2}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 390, p: 2, borderLeft: `4px solid ${colors.plum}`, background: colors.lavender }}>
            <Typography sx={{ color: colors.plumDeep, fontSize: '0.85rem', fontWeight: 800, lineHeight: 1.55 }}>
              Pantau nomor antrean Anda pada layar. Nomor yang sedang dilayani akan ditampilkan di bagian atas.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(320px, 1.25fr) minmax(0, 2.75fr)' },
            alignItems: 'start',
            gap: { xs: 4, lg: 3.5 }
          }}
        >
          <Box sx={{ maxWidth: { lg: 560 }, width: '100%', minWidth: 0 }}>
            <Box component='section' aria-labelledby='serving-heading'>
              <SectionTitle eyebrow='Sekarang' title='Nomor yang sedang dilayani' />
              <Box
                id='serving-heading'
                sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 }}
              >
                {data.doctors.map((doctor, index) => (
                  <DoctorServingCard doctor={doctor} index={index} key={doctor.id} />
                ))}
              </Box>
            </Box>

            <Box component='section' aria-labelledby='queue-heading' sx={{ mt: { xs: 4, md: 6 } }}>
              <SectionTitle eyebrow={`Berikutnya · ${data.queue.length} pasien`} title='Antrean berikutnya' />
              <Surface sx={{ overflow: 'hidden' }}>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'grid' },
                    gridTemplateColumns: '76px minmax(0, 1fr) minmax(170px, 200px)',
                    gap: 2,
                    px: 2.25,
                    overflow: 'hidden',
                    py: 1.25,
                    borderBottom: `1px solid ${colors.line}`,
                    background: colors.plumDeep,
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase'
                  }}
                >
                  <Box component='span' sx={{ textAlign: 'center' }}>No.</Box>
                  <Box component='span'>Pasien</Box>
                  <Box component='span'>Dokter</Box>
                </Box>
                {data.queue.length > 0 ? (
                  data.queue.map(item => <QueueRow item={item} key={item.id} />)
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center', color: colors.inkSoft }}>
                    Belum ada pasien dalam antrean berikutnya.
                  </Box>
                )}
              </Surface>
            </Box>

            {data.announcements.length > 0 && (
              <Surface sx={{ mt: { xs: 4, md: 6 }, p: { xs: 2, md: 2.5 }, background: colors.lavender }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
                  <Badge>!</Badge>
                  <Box>
                    <Typography sx={{ color: colors.plumDeep, fontWeight: 900 }}>Informasi klinik</Typography>
                    <Stack gap={0.35} mt={0.5}>
                      {data.announcements.map(announcement => (
                        <Typography key={announcement} sx={{ color: colors.inkSoft, fontSize: '0.85rem' }}>
                          {announcement}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Surface>
            )}
          </Box>
          <QueueVideo video={data.video} />
        </Box>

        <Typography component='footer' sx={{ py: 3, textAlign: 'center', color: colors.inkSoft, fontSize: '0.75rem' }}>
          Mohon perhatikan layar untuk informasi pemanggilan nomor antrean.
        </Typography>
      </Box>
    </Box>
  )
}

export default QueueScreen
